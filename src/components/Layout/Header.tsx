import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            VetEducation CRM
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">Admin User</div>
              <div className="text-gray-500">admin@veteducation.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}