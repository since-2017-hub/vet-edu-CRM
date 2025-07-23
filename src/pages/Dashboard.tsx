import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MetricCard from '../components/Dashboard/MetricCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import SubscriptionChart from '../components/Dashboard/SubscriptionChart';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { mockDashboardMetrics, mockContacts, mockSubscriptions, mockPurchases } from '../data/mockData';
import { Contact, Subscription, Purchase } from '../types';
import {
  UsersIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  EnvelopeOpenIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [contacts] = useLocalStorage<Contact[]>('contacts', mockContacts);
  const [subscriptions] = useLocalStorage<Subscription[]>('subscriptions', []);
  const [purchases] = useLocalStorage<Purchase[]>('purchases', mockPurchases);
  
  const metrics = mockDashboardMetrics;
  const totalContacts = contacts.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Contacts"
          value={totalContacts.toLocaleString()}
          change="+12%"
          changeType="positive"
          icon={<UsersIcon className="h-6 w-6" />}
        />
        <MetricCard
          title="Active Subscriptions"
          value={activeSubscriptions.toLocaleString()}
          change="+8%"
          changeType="positive"
          icon={<CreditCardIcon className="h-6 w-6" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${metrics.monthlyRevenue.toLocaleString()}`}
          change="+15%"
          changeType="positive"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
        />
        <MetricCard
          title="Email Open Rate"
          value={`${metrics.emailOpenRate}%`}
          change="+2.1%"
          changeType="positive"
          icon={<EnvelopeOpenIcon className="h-6 w-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={metrics.revenueGrowth} />
        <SubscriptionChart data={metrics.subscriptionGrowth} />
      </div>

      {/* Recent Activity and Top Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity purchases={purchases.slice(0, 5)} />
        
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Top Products
            </h3>
            <div className="space-y-4">
              {metrics.topProducts.map((item, idx) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{idx + 1}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">${item.product.price} {item.product.currency}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.sales} sales
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}