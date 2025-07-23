# VetEducation CRM & Email Marketing System

A comprehensive Customer Relationship Management and Email Marketing system built specifically for VetEducation's course-driven, subscription-centric business model.

## Features

### 🎯 Core CRM Functionality
- **Contact Management**: Unified contact database with tagging, segmentation, and engagement scoring
- **Subscription Management**: Handle Individual and Practice subscriptions with parent/child relationships
- **Product Management**: Manage courses, webinars, and subscription offerings
- **Purchase Tracking**: Complete order history and transaction management

### 📧 Email Marketing
- **Campaign Management**: Create and manage broadcast, automation, and transactional emails
- **Automation Sequences**: Drag-and-drop automation builder for onboarding, nurture, and win-back campaigns
- **Segmentation**: Advanced contact segmentation by tags, job titles, engagement levels, and purchase history
- **Analytics**: Comprehensive email performance metrics (open rates, click rates, conversions)

### 📊 Analytics & Reporting
- **Dashboard**: Real-time business metrics and KPIs
- **Revenue Analytics**: Track revenue growth, subscription trends, and product performance
- **Customer Insights**: Engagement scoring, source tracking, and customer lifetime value
- **Visual Reports**: Interactive charts and graphs for data visualization

### 🔗 Integration Capabilities
- **LearnDash LMS**: Seamless integration with existing WordPress LMS
- **Payment Processing**: Eway integration with Stripe support
- **Email Delivery**: SMTP configuration for reliable email delivery
- **API Ready**: Built for future integrations and third-party connections

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS + Headless UI
- **Charts**: Recharts for data visualization
- **Icons**: Heroicons
- **Routing**: React Router v6
- **Build Tool**: Vite

## Key Components

### Contact Management
- Advanced search and filtering
- Tag-based organization
- Engagement scoring
- Activity tracking
- Custom fields support

### Subscription System
- Individual vs Practice subscriptions
- Team member management for Practice accounts
- Renewal and cancellation workflows
- Payment method management
- Automated billing cycles

### Email Marketing
- Visual campaign builder
- Template management
- A/B testing capabilities
- Deliverability optimization
- Unsubscribe management

### Reporting Dashboard
- Revenue tracking
- Subscription analytics
- Email performance metrics
- Customer segmentation analysis
- Source attribution

## Business Logic

### Subscription Types
1. **Individual Subscriptions**: Single-user access to webinars and content
2. **Practice Subscriptions**: Multi-user access (up to 5 team members) with admin controls

### Automation Workflows
- Welcome sequences for new subscribers
- Onboarding campaigns for course purchases
- Renewal reminders and win-back campaigns
- Engagement-based nurture sequences

### Data Migration Support
- Import from Keap CRM
- Preserve existing tags and automation sequences
- Maintain subscription billing continuity
- Historical data preservation

## Security Features
- Two-factor authentication
- Session management
- IP restrictions
- Role-based access control
- Data encryption

## Integration Points

### Current System Compatibility
- **Keap CRM**: Data migration and tag preservation
- **WooCommerce**: Order form integration
- **LearnDash**: User access management
- **Eway**: Payment processing
- **Brevo**: Email delivery transition

### Future Integrations
- Stripe payment processing
- Advanced analytics platforms
- Social media advertising pixels
- Affiliate tracking systems

## Development Notes

This system addresses VetEducation's specific pain points:
- Fragmented data across multiple platforms
- Complex subscription management requirements
- Email deliverability issues
- Limited reporting capabilities
- Manual processes and workflow breakdowns

The architecture is designed to be scalable, maintainable, and easily extensible for future business requirements.