export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  tags: string[];
  source: 'organic' | 'social' | 'email' | 'referral' | 'affiliate';
  createdAt: Date;
  lastActivity: Date;
  subscriptions: Subscription[];
  purchases: Purchase[];
  engagementScore: number;
}

export interface Subscription {
  id: string;
  contactId: string;
  type: 'individual' | 'practice';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  renewalDate: Date;
  amount: number;
  currency: string;
  paymentMethod: string;
  parentSubscriptionId?: string; // For practice team members
  teamMembers?: Contact[]; // For practice subscriptions
  maxTeamMembers: number;
}

export interface Purchase {
  id: string;
  contactId: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  purchaseDate: Date;
  status: 'completed' | 'pending' | 'refunded';
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  type: 'course' | 'webinar' | 'subscription';
  price: number;
  currency: string;
  description: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'broadcast' | 'automation' | 'transactional';
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  scheduledAt?: Date;
  sentAt?: Date;
  recipients: string[];
  segmentCriteria?: SegmentCriteria;
  metrics: EmailMetrics;
}

export interface EmailMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  bounced: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
}

export interface SegmentCriteria {
  tags?: string[];
  jobTitles?: string[];
  subscriptionTypes?: string[];
  purchaseHistory?: string[];
  engagementLevel?: 'high' | 'medium' | 'low';
  source?: string[];
}

export interface AutomationSequence {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  steps: AutomationStep[];
  isActive: boolean;
  createdAt: Date;
}

export interface AutomationTrigger {
  type: 'subscription_created' | 'purchase_completed' | 'tag_added' | 'date_based';
  conditions: Record<string, any>;
}

export interface AutomationStep {
  id: string;
  type: 'email' | 'tag' | 'wait' | 'condition';
  delay: number; // in hours
  content?: string;
  conditions?: Record<string, any>;
}

export interface DashboardMetrics {
  totalContacts: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  emailOpenRate: number;
  recentPurchases: Purchase[];
  topProducts: Array<{ product: Product; sales: number }>;
  subscriptionGrowth: Array<{ date: string; individual: number; practice: number }>;
  revenueGrowth: Array<{ date: string; revenue: number }>;
}