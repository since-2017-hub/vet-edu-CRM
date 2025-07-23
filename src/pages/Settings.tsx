import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  CogIcon, 
  EnvelopeIcon, 
  CreditCardIcon, 
  ShieldCheckIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useLocalStorage('settings', {
    company: {
      name: 'VetEducation',
      website: 'https://veteducation.com',
      supportEmail: 'support@veteducation.com',
      timezone: 'Australia/Sydney'
    },
    email: {
      smtpServer: '',
      port: 587,
      encryption: 'TLS',
      username: '',
      password: ''
    },
    payments: {
      ewayApiKey: '••••••••••••••••',
      ewayCustomerId: '87654321',
      stripeConnected: false
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: '30 minutes',
      ipRestrictionsEnabled: false
    },
    notifications: {
      newSubscriptions: true,
      paymentFailures: true,
      weeklyReports: true,
      systemUpdates: false
    }
  });

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleConnectStripe = () => {
    setSettings(prev => ({
      ...prev,
      payments: {
        ...prev.payments,
        stripeConnected: true
      }
    }));
    alert('Stripe connected successfully!');
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'email', name: 'Email Settings', icon: EnvelopeIcon },
    { id: 'payments', name: 'Payment Integration', icon: CreditCardIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'users', name: 'User Management', icon: UserIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Basic information about your organization.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={settings.company.name}
                  onChange={(e) => updateSetting('company', 'name', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  value={settings.company.website}
                  onChange={(e) => updateSetting('company', 'website', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Support Email</label>
                <input
                  type="email"
                  value={settings.company.supportEmail}
                  onChange={(e) => updateSetting('company', 'supportEmail', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select 
                  value={settings.company.timezone}
                  onChange={(e) => updateSetting('company', 'timezone', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Australia/Sydney</option>
                  <option>Australia/Melbourne</option>
                  <option>Australia/Brisbane</option>
                  <option>Australia/Perth</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email Configuration</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure your email delivery and automation settings.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Server</label>
                <input
                  type="text"
                  value={settings.email.smtpServer}
                  onChange={(e) => updateSetting('email', 'smtpServer', e.target.value)}
                  placeholder="smtp.example.com"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Port</label>
                  <input
                    type="number"
                    value={settings.email.port}
                    onChange={(e) => updateSetting('email', 'port', parseInt(e.target.value))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Encryption</label>
                  <select 
                    value={settings.email.encryption}
                    onChange={(e) => updateSetting('email', 'encryption', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={settings.email.username}
                    onChange={(e) => updateSetting('email', 'username', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={settings.email.password}
                    onChange={(e) => updateSetting('email', 'password', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Payment Integration</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure payment gateways and subscription billing.
              </p>
            </div>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Eway Gateway</h4>
                    <p className="text-sm text-gray-500">Current payment processor</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                      type="password"
                      value={settings.payments.ewayApiKey}
                      onChange={(e) => updateSetting('payments', 'ewayApiKey', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                      type="text"
                      value={settings.payments.ewayCustomerId}
                      onChange={(e) => updateSetting('payments', 'ewayCustomerId', e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Stripe (Optional)</h4>
                    <p className="text-sm text-gray-500">Alternative payment processor</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {settings.payments.stripeConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={handleConnectStripe}
                    disabled={settings.payments.stripeConnected}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      settings.payments.stripeConnected 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {settings.payments.stripeConnected ? 'Connected' : 'Connect Stripe'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage security and access controls.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <button 
                  onClick={() => updateSetting('security', 'twoFactorEnabled', !settings.security.twoFactorEnabled)}
                  className={`${settings.security.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.security.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                  <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                </div>
                <select 
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                  className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">IP Restrictions</h4>
                  <p className="text-sm text-gray-500">Limit access to specific IP addresses</p>
                </div>
                <button 
                  onClick={() => updateSetting('security', 'ipRestrictionsEnabled', !settings.security.ipRestrictionsEnabled)}
                  className={`${settings.security.ipRestrictionsEnabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.security.ipRestrictionsEnabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose what notifications you want to receive.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">New Subscriptions</h4>
                  <p className="text-sm text-gray-500">Get notified when someone subscribes</p>
                </div>
                <button 
                  onClick={() => updateSetting('notifications', 'newSubscriptions', !settings.notifications.newSubscriptions)}
                  className={`${settings.notifications.newSubscriptions ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.notifications.newSubscriptions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Payment Failures</h4>
                  <p className="text-sm text-gray-500">Alert when payments fail</p>
                </div>
                <button 
                  onClick={() => updateSetting('notifications', 'paymentFailures', !settings.notifications.paymentFailures)}
                  className={`${settings.notifications.paymentFailures ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.notifications.paymentFailures ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
                  <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                </div>
                <button 
                  onClick={() => updateSetting('notifications', 'weeklyReports', !settings.notifications.weeklyReports)}
                  className={`${settings.notifications.weeklyReports ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.notifications.weeklyReports ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">System Updates</h4>
                  <p className="text-sm text-gray-500">Notifications about system maintenance</p>
                </div>
                <button 
                  onClick={() => updateSetting('notifications', 'systemUpdates', !settings.notifications.systemUpdates)}
                  className={`${settings.notifications.systemUpdates ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <span className={`${settings.notifications.systemUpdates ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage team access and permissions.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                onClick={() => alert('Invite User functionality would open a modal to send invitations')}
              >
                Invite User
              </button>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">AD</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Admin User</div>
                          <div className="text-sm text-gray-500">admin@veteducation.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Administrator
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Dec 21, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your CRM system and integrations.
        </p>
      </div>

      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {renderTabContent()}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  onClick={() => window.location.reload()}
                >
                  Reset
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  onClick={handleSaveSettings}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}