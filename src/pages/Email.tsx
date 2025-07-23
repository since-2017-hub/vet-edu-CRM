import React from 'react';
import { useState } from 'react';
import CampaignList from '../components/Email/CampaignList';
import CampaignModal from '../components/Modals/CampaignModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockEmailCampaigns } from '../data/mockData';
import { EmailCampaign } from '../types';

export default function Email() {
  const [campaigns, setCampaigns] = useLocalStorage<EmailCampaign[]>('campaigns', mockEmailCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);

  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: EmailCampaign) => {
    setEditingCampaign(campaign);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveCampaign = (campaignData: Partial<EmailCampaign>) => {
    if (modalMode === 'create') {
      const newCampaign: EmailCampaign = {
        id: Date.now().toString(),
        ...campaignData,
        recipients: [],
        metrics: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          unsubscribed: 0,
          bounced: 0,
          openRate: 0,
          clickRate: 0,
          unsubscribeRate: 0
        }
      } as EmailCampaign;
      setCampaigns([...campaigns, newCampaign]);
    } else if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...campaignData }
          : c
      ));
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Email Marketing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage email campaigns, automation sequences, and track performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">S</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Emails Sent</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.metrics.sent, 0).toLocaleString()}
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
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">O</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Open Rate</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.metrics.openRate, 0) / campaigns.length).toFixed(1) : '0.0'}%
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
                  <span className="text-white text-sm font-medium">C</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Click Rate</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.metrics.clickRate, 0) / campaigns.length).toFixed(1) : '0.0'}%
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
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unsubscribe Rate</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.metrics.unsubscribeRate, 0) / campaigns.length).toFixed(1) : '0.0'}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CampaignList 
        campaigns={campaigns} 
        onCreateCampaign={handleCreateCampaign}
        onEditCampaign={handleEditCampaign}
        onDeleteCampaign={handleDeleteCampaign}
      />

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCampaign}
        campaign={editingCampaign}
        mode={modalMode}
      />
    </div>
  );
}