import React from 'react';
import { useState } from 'react';
import ProductModal from '../components/Modals/ProductModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { AcademicCapIcon, PlayIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function Products() {
  const [products, setProducts] = useLocalStorage<Product[]>('products', mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (modalMode === 'create') {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date()
      } as Product;
      setProducts([...products, newProduct]);
    } else if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleToggleStatus = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, isActive: !p.isActive }
        : p
    ));
  };
  const getProductIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <AcademicCapIcon className="h-6 w-6" />;
      case 'webinar':
        return <PlayIcon className="h-6 w-6" />;
      case 'subscription':
        return <CreditCardIcon className="h-6 w-6" />;
      default:
        return <AcademicCapIcon className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'webinar':
        return 'bg-green-100 text-green-800';
      case 'subscription':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your courses, webinars, and subscription offerings.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">
                      {getProductIcon(product.type)}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(product.type)}`}>
                      {product.type}
                    </span>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className="hover:opacity-75"
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price} {product.currency}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        mode={modalMode}
      />
    </div>
  );
}