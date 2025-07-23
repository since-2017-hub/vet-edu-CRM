import React, { useState } from 'react';
import ContactList from '../components/Contacts/ContactList';
import ContactModal from '../components/Modals/ContactModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockContacts } from '../data/mockData';
import { Contact } from '../types';

export default function Contacts() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCreateContact = () => {
    setEditingContact(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveContact = (contactData: Partial<Contact>) => {
    if (modalMode === 'create') {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...contactData,
        createdAt: new Date(),
        lastActivity: new Date(),
        subscriptions: [],
        purchases: [],
        engagementScore: Math.floor(Math.random() * 100)
      } as Contact;
      setContacts([...contacts, newContact]);
    } else if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...c, ...contactData }
          : c
      ));
      if (selectedContact?.id === editingContact.id) {
        setSelectedContact({ ...selectedContact, ...contactData } as Contact);
      }
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== contactId));
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
      }
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your customer relationships and contact information.
        </p>
        </div>
        <button
          onClick={handleCreateContact}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactList 
            contacts={contacts} 
            onContactSelect={handleContactSelect}
          />
        </div>
        
        <div className="lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditContact(selectedContact)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.jobTitle || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.company || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedContact.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Engagement Score</label>
                  <div className="mt-1 flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${selectedContact.engagementScore}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedContact.engagementScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500 text-center">
                Select a contact to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contact={editingContact}
        mode={modalMode}
      />
    </div>
  );
}