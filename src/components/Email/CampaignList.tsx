import React from 'react';
import { EmailCampaign } from '../../types';
import { format } from 'date-fns';
import { 
  EnvelopeIcon, 
  EyeIcon, 
  CursorArrowRaysIcon,
  UserMinusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface CampaignListProps {
  campaigns: EmailCampaign[];
  onCreateCampaign: () => void;
  onEditCampaign: (campaign: EmailCampaign) => void;
  onDeleteCampaign: (campaignId: string) => void;
}

export default function CampaignList({ campaigns, onCreateCampaign, onEditCampaign, onDeleteCampaign }: CampaignListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'broadcast':
        return 'bg-purple-100 text-purple-800';
      case 'automation':
        return 'bg-blue-100 text-blue-800';
      case 'transactional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Email Campaigns ({campaigns.length})
          </h3>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            onClick={onCreateCampaign}
          >
            Create Campaign
          </button>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
                      {campaign.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{campaign.subject}</p>
                  <div className="text-sm text-gray-500">
                    {campaign.sentAt ? (
                      <span>Sent on {format(campaign.sentAt, 'MMM d, yyyy \'at\' h:mm a')}</span>
                    ) : campaign.scheduledAt ? (
                      <span>Scheduled for {format(campaign.scheduledAt, 'MMM d, yyyy \'at\' h:mm a')}</span>
                    ) : (
                      <span>Draft</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onEditCampaign(campaign)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Campaign"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Campaign"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
                
              {campaign.status === 'sent' && (
                <div className="border-t pt-4">
                  <div className="flex space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{campaign.metrics.sent}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-600">{campaign.metrics.opened}</span>
                      <span className="text-gray-400">({campaign.metrics.openRate}%)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CursorArrowRaysIcon className="h-4 w-4 text-green-400" />
                      <span className="text-gray-600">{campaign.metrics.clicked}</span>
                      <span className="text-gray-400">({campaign.metrics.clickRate}%)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserMinusIcon className="h-4 w-4 text-red-400" />
                      <span className="text-gray-600">{campaign.metrics.unsubscribed}</span>
                      <span className="text-gray-400">({campaign.metrics.unsubscribeRate}%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}