import React, { useState, useEffect } from 'react';
import { EmailCampaign } from '../../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Partial<EmailCampaign>) => void;
  campaign?: EmailCampaign | null;
  mode: 'create' | 'edit';
}

export default function CampaignModal({ isOpen, onClose, onSave, campaign, mode }: CampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'broadcast' as const,
    status: 'draft' as const,
    scheduledAt: '',
    recipients: [] as string[]
  });

  useEffect(() => {
    if (campaign && mode === 'edit') {
      setFormData({
        name: campaign.name,
        subject: campaign.subject,
        content: campaign.content,
        type: campaign.type,
        status: campaign.status,
        scheduledAt: campaign.scheduledAt ? campaign.scheduledAt.toISOString().slice(0, 16) : '',
        recipients: campaign.recipients
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        content: '',
        type: 'broadcast',
        status: 'draft',
        scheduledAt: '',
        recipients: []
      });
    }
  }, [campaign, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const campaignData = {
      ...formData,
      scheduledAt: formData.scheduledAt ? new Date(formData.scheduledAt) : undefined
    };
    onSave(campaignData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'create' ? 'Create New Campaign' : 'Edit Campaign'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject Line</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="broadcast">Broadcast</option>
                <option value="automation">Automation</option>
                <option value="transactional">Transactional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>

          {formData.status === 'scheduled' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Schedule Date & Time</label>
              <input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              placeholder="Enter your email content here..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}