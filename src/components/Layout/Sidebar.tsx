import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  EnvelopeIcon,
  ChartBarIcon,
  CogIcon,
  AcademicCapIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Contacts', href: '/contacts', icon: UsersIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
  { name: 'Email Marketing', href: '/email', icon: EnvelopeIcon },
  { name: 'Products', href: '/products', icon: AcademicCapIcon },
  { name: 'Tags & Segments', href: '/segments', icon: TagIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-900">
      <div className="flex items-center h-16 px-4 bg-gray-900">
        <AcademicCapIcon className="w-8 h-8 text-blue-400" />
        <span className="ml-2 text-xl font-semibold text-white">VetEducation CRM</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}