import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockContacts } from '../data/mockData';
import { Contact } from '../types';
import { TagIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function Segments() {
  const [contacts] = useLocalStorage<Contact[]>('contacts', mockContacts);
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedSegmentContacts, setSelectedSegmentContacts] = useState<Contact[]>([]);

  // Extract all unique tags and job titles for segmentation
  const allTags = Array.from(new Set(contacts.flatMap(c => c.tags)));
  const allJobTitles = Array.from(new Set(contacts.map(c => c.jobTitle).filter(Boolean)));
  const allSources = Array.from(new Set(contacts.map(c => c.source)));

  const getSegmentCount = (type: string, value: string) => {
    switch (type) {
      case 'tag':
        return contacts.filter(c => c.tags.includes(value)).length;
      case 'jobTitle':
        return contacts.filter(c => c.jobTitle === value).length;
      case 'source':
        return contacts.filter(c => c.source === value).length;
      default:
        return 0;
    }
  };

  const getSegmentContacts = (type: string, value: string) => {
    switch (type) {
      case 'tag':
        return contacts.filter(c => c.tags.includes(value));
      case 'jobTitle':
        return contacts.filter(c => c.jobTitle === value);
      case 'source':
        return contacts.filter(c => c.source === value);
      default:
        return [];
    }
  };

  const handleEmailSegment = (type: string, value: string) => {
    const segmentContacts = getSegmentContacts(type, value);
    setSelectedSegmentContacts(segmentContacts);
    setEmailModalOpen(true);
  };

  const handleCreateSegment = () => {
    alert('Create Segment functionality would open a modal to define custom segment criteria');
  };

  const segments = [
    {
      name: 'Tags',
      type: 'tag',
      items: allTags,
      icon: <TagIcon className="h-5 w-5" />,
      color: 'blue'
    },
    {
      name: 'Job Titles',
      type: 'jobTitle',
      items: allJobTitles,
      icon: <UsersIcon className="h-5 w-5" />,
      color: 'green'
    },
    {
      name: 'Sources',
      type: 'source',
      items: allSources,
      icon: <UsersIcon className="h-5 w-5" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tags & Segments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize and segment your contacts for targeted marketing campaigns.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          onClick={handleCreateSegment}
        >
          Create Segment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {segments.map((segment) => (
          <div key={segment.name} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <div className={`text-${segment.color}-500`}>
                  {segment.icon}
                </div>
                <h3 className="ml-2 text-lg font-medium text-gray-900">{segment.name}</h3>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {segment.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSegment(`${segment.type}:${item}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${segment.color}-100 text-${segment.color}-800`}>
                        {item}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {getSegmentCount(segment.type, item)} contacts
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        onClick={() => handleEmailSegment(segment.type, item)}
                      >
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Levels */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Levels</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">High Engagement</h4>
                  <p className="text-sm text-gray-500">Score: 80-100</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {contacts.filter(c => c.engagementScore >= 80).length}
                  </div>
                  <p className="text-sm text-gray-500">contacts</p>
                  <button 
                    onClick={() => handleEmailSegment('engagement', 'high')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Medium Engagement</h4>
                  <p className="text-sm text-gray-500">Score: 50-79</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">
                    {contacts.filter(c => c.engagementScore >= 50 && c.engagementScore < 80).length}
                  </div>
                  <p className="text-sm text-gray-500">contacts</p>
                  <button 
                    onClick={() => handleEmailSegment('engagement', 'medium')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Low Engagement</h4>
                  <p className="text-sm text-gray-500">Score: 0-49</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    {contacts.filter(c => c.engagementScore < 50).length}
                  </div>
                  <p className="text-sm text-gray-500">contacts</p>
                  <button 
                    onClick={() => handleEmailSegment('engagement', 'low')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Email Segment</h3>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Ready to email {selectedSegmentContacts.length} contacts in this segment.
              </p>
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {selectedSegmentContacts.slice(0, 10).map(contact => (
                  <div key={contact.id} className="text-sm py-1">
                    {contact.firstName} {contact.lastName} - {contact.email}
                  </div>
                ))}
                {selectedSegmentContacts.length > 10 && (
                  <div className="text-sm text-gray-500 py-1">
                    ...and {selectedSegmentContacts.length - 10} more
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Email campaign would be created for this segment');
                    setEmailModalOpen(false);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}