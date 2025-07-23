import React from 'react';
import SubscriptionList from '../components/Subscriptions/SubscriptionList';
import { mockSubscriptions, mockContacts } from '../data/mockData';

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage individual and practice subscriptions, renewals, and team access.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Subscriptions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {mockSubscriptions.filter(s => s.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">I</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Individual</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {mockSubscriptions.filter(s => s.type === 'individual').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">P</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Practice</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {mockSubscriptions.filter(s => s.type === 'practice').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionList subscriptions={mockSubscriptions} contacts={mockContacts} />
    </div>
  );
}