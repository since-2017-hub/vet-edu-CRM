import { Contact, Subscription, Purchase, Product, EmailCampaign, DashboardMetrics } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@vetclinic.com',
    phone: '+61 400 123 456',
    jobTitle: 'Veterinary Nurse',
    company: 'Melbourne Vet Clinic',
    tags: ['VN', 'CARDIOLOGY_2025', 'ACTIVE_SUBSCRIBER'],
    source: 'organic',
    createdAt: new Date('2023-01-15'),
    lastActivity: new Date('2024-12-20'),
    subscriptions: [],
    purchases: [],
    engagementScore: 85
  },
  {
    id: '2',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    email: 'michael.chen@animalcare.com.au',
    phone: '+61 400 234 567',
    jobTitle: 'Veterinarian',
    company: 'Animal Care Hospital',
    tags: ['VET', 'PRACTICE_ADMIN', 'PREMIUM_SUBSCRIBER'],
    source: 'referral',
    createdAt: new Date('2022-08-20'),
    lastActivity: new Date('2024-12-21'),
    subscriptions: [],
    purchases: [],
    engagementScore: 92
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@petcare.net',
    phone: '+61 400 345 678',
    jobTitle: 'Practice Manager',
    company: 'Sydney Pet Care',
    tags: ['MANAGER', 'WEBINAR_MEMBER', 'HIGH_ENGAGEMENT'],
    source: 'social',
    createdAt: new Date('2023-05-10'),
    lastActivity: new Date('2024-12-19'),
    subscriptions: [],
    purchases: [],
    engagementScore: 78
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1',
    contactId: '1',
    type: 'individual',
    status: 'active',
    startDate: new Date('2024-01-01'),
    renewalDate: new Date('2025-01-01'),
    amount: 299,
    currency: 'AUD',
    paymentMethod: 'Credit Card',
    maxTeamMembers: 1
  },
  {
    id: 'sub_2',
    contactId: '2',
    type: 'practice',
    status: 'active',
    startDate: new Date('2024-03-15'),
    renewalDate: new Date('2025-03-15'),
    amount: 899,
    currency: 'AUD',
    paymentMethod: 'Credit Card',
    maxTeamMembers: 5
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Small Animal Cardiology for Veterinary Nurses',
    type: 'course',
    price: 199,
    currency: 'AUD',
    description: 'Comprehensive cardiology course for veterinary nurses',
    tags: ['CARDIOLOGY', 'VN', 'CPD'],
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'prod_2',
    name: 'Individual Webinar Membership',
    type: 'subscription',
    price: 299,
    currency: 'AUD',
    description: 'Monthly webinar access for individuals',
    tags: ['WEBINAR', 'INDIVIDUAL', 'SUBSCRIPTION'],
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'prod_3',
    name: 'Practice Webinar Membership',
    type: 'subscription',
    price: 899,
    currency: 'AUD',
    description: 'Monthly webinar access for practice teams (up to 5 members)',
    tags: ['WEBINAR', 'PRACTICE', 'SUBSCRIPTION'],
    isActive: true,
    createdAt: new Date('2024-01-01')
  }
];

export const mockPurchases: Purchase[] = [
  {
    id: 'pur_1',
    contactId: '1',
    productId: 'prod_1',
    productName: 'Small Animal Cardiology for Veterinary Nurses',
    amount: 199,
    currency: 'AUD',
    purchaseDate: new Date('2024-11-15'),
    status: 'completed',
    tags: ['CARDIOLOGY_2025']
  },
  {
    id: 'pur_2',
    contactId: '2',
    productId: 'prod_3',
    productName: 'Practice Webinar Membership',
    amount: 899,
    currency: 'AUD',
    purchaseDate: new Date('2024-03-15'),
    status: 'completed',
    tags: ['PRACTICE_SUBSCRIPTION']
  }
];

export const mockEmailCampaigns: EmailCampaign[] = [
  {
    id: 'camp_1',
    name: 'Welcome Series - New Subscribers',
    subject: 'Welcome to VetEducation!',
    content: 'Welcome email content...',
    type: 'automation',
    status: 'sent',
    sentAt: new Date('2024-12-20'),
    recipients: ['1', '2', '3'],
    metrics: {
      sent: 150,
      delivered: 148,
      opened: 89,
      clicked: 23,
      unsubscribed: 2,
      bounced: 2,
      openRate: 60.1,
      clickRate: 25.8,
      unsubscribeRate: 1.3
    }
  },
  {
    id: 'camp_2',
    name: 'Monthly Newsletter - December',
    subject: 'Your December CPD Update',
    content: 'Newsletter content...',
    type: 'broadcast',
    status: 'sent',
    sentAt: new Date('2024-12-01'),
    recipients: ['1', '2', '3'],
    metrics: {
      sent: 2500,
      delivered: 2485,
      opened: 1242,
      clicked: 186,
      unsubscribed: 8,
      bounced: 15,
      openRate: 50.0,
      clickRate: 15.0,
      unsubscribeRate: 0.3
    }
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalContacts: 2847,
  activeSubscriptions: 1256,
  monthlyRevenue: 45680,
  emailOpenRate: 52.3,
  recentPurchases: mockPurchases.slice(0, 5),
  topProducts: [
    { product: mockProducts[0], sales: 156 },
    { product: mockProducts[1], sales: 89 },
    { product: mockProducts[2], sales: 67 }
  ],
  subscriptionGrowth: [
    { date: '2024-08', individual: 45, practice: 12 },
    { date: '2024-09', individual: 52, practice: 15 },
    { date: '2024-10', individual: 61, practice: 18 },
    { date: '2024-11', individual: 68, practice: 22 },
    { date: '2024-12', individual: 74, practice: 25 }
  ],
  revenueGrowth: [
    { date: '2024-08', revenue: 32500 },
    { date: '2024-09', revenue: 35200 },
    { date: '2024-10', revenue: 38900 },
    { date: '2024-11', revenue: 42100 },
    { date: '2024-12', revenue: 45680 }
  ]
};