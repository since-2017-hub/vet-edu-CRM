import React from 'react';
import { Purchase } from '../../types';
import { format } from 'date-fns';

interface RecentActivityProps {
  purchases: Purchase[];
}

export default function RecentActivity({ purchases }: RecentActivityProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Recent Purchases
        </h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {purchases.map((purchase, idx) => (
              <li key={purchase.id}>
                <div className="relative pb-8">
                  {idx !== purchases.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm font-medium">$</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {purchase.productName}
                          </span>{' '}
                          purchased
                        </p>
                        <p className="text-sm text-gray-500">
                          ${purchase.amount} {purchase.currency}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {format(purchase.purchaseDate, 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}