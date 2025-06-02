# InfluAI - AI-Powered Influencer Discovery & Negotiation Platform

![InfluAI Logo](public/cosmic-beam.png)

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗 System Architecture](#-system-architecture)
- [📋 Project Structure](#-project-structure)
- [🔍 Core Functionality](#-core-functionality)
  - [Influencer Discovery Engine](#influencer-discovery-engine)
  - [AI Voice Negotiation System](#ai-voice-negotiation-system)
  - [Email Automation Pipeline](#email-automation-pipeline)
  - [Campaign Management Suite](#campaign-management-suite)
- [🖥️ Backend Services](#️-backend-services)
  - [Next.js API Routes](#nextjs-api-routes)
  - [Python Flask Microservice](#python-flask-microservice)
  - [AI Integration Layer](#ai-integration-layer)
  - [WebSocket Services](#websocket-services)
- [🎨 Frontend Architecture](#-frontend-architecture)
- [🔒 Authentication & Security](#-authentication--security)
- [📊 Database Schema](#-database-schema)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [🚀 Deployment Architecture](#-deployment-architecture)
- [🧪 Testing Strategy](#-testing-strategy)
- [📱 Mobile Responsiveness](#-mobile-responsiveness)
- [🌐 Internationalization](#-internationalization)
- [🔮 Future Enhancements](#-future-enhancements)
- [🚀 Getting Started](#-getting-started)
- [📖 API Documentation](#-api-documentation)
- [🛠️ Development Guide](#️-development-guide)
- [🐛 Troubleshooting](#-troubleshooting)
- [👥 Team](#-team)
- [🙏 Acknowledgements](#-acknowledgements)

## 🚀 Overview

InfluAI is a revolutionary AI-powered platform that transforms the influencer marketing landscape by automating the entire workflow from discovery to negotiation. Built for the 100x Engineers Hackathon in collaboration with Oprah Fx, this comprehensive solution addresses the critical pain points faced by brands, agencies, and marketers in the influencer economy.

### Problem Statement

The influencer marketing industry faces several challenges:
- **Manual Discovery Process**: Finding the right influencers requires hours of manual research
- **Inefficient Outreach**: Generic emails result in low response rates
- **Complex Negotiations**: Back-and-forth negotiations consume significant time and resources
- **Scalability Issues**: Agencies struggle to manage multiple campaigns simultaneously
- **ROI Tracking**: Difficulty in measuring campaign effectiveness and influencer performance

### Solution

InfluAI leverages cutting-edge AI technology to automate and optimize every aspect of influencer marketing:
- **Intelligent Discovery**: Natural language search powered by advanced AI algorithms
- **Automated Negotiations**: AI voice agents that can conduct real-time negotiations
- **Personalized Outreach**: AI-generated emails tailored to each influencer's profile
- **Comprehensive Analytics**: Real-time tracking and performance optimization
- **Scalable Operations**: Handle hundreds of campaigns simultaneously

## ✨ Key Features

### 🔍 Discovery & Search
- **Natural Language Search**: Find influencers using conversational prompts like "Find beauty influencers in Los Angeles with 50K+ followers"
- **AI-Powered Recommendations**: Intelligent matching based on campaign goals, brand values, and audience demographics
- **Advanced Filtering System**: Multi-dimensional filtering by platform, niche, followers, engagement rate, location, and more
- **Visual Search Results**: Comprehensive influencer profiles with key metrics, recent posts, and engagement analytics
- **Relevance Scoring**: AI-generated relevance scores for each influencer match with detailed explanations
- **Competitor Analysis**: Identify influencers working with competitors and analyze their strategies
- **Trend Detection**: Discover emerging influencers and trending content creators

### 🤖 Negotiation & Outreach
- **AI Voice Agent**: Revolutionary voice-based negotiation system with natural conversation flow
- **Step-by-Step Call Simulation**: Visual representation of the negotiation process with real-time updates
- **Dynamic Email Generation**: AI-crafted personalized outreach emails with A/B testing capabilities
- **Response Handling**: Automated follow-ups and intelligent response management
- **Negotiation Strategy Engine**: Dynamic pricing and offer adjustments based on influencer value and market rates
- **Multi-Channel Outreach**: Coordinate outreach across email, social media, and phone calls
- **Conversation Analytics**: Track conversation sentiment, response rates, and negotiation success

### 📊 Campaign Management
- **Campaign Creation Wizard**: Easy-to-use campaign setup with AI-assisted planning
- **Influencer Portfolio Management**: Track outreach status, responses, and collaboration history
- **Performance Analytics Dashboard**: Comprehensive insights on campaign ROI and influencer performance
- **Budget Management System**: Allocation, tracking, and optimization of campaign budgets
- **Timeline Visualization**: Campaign schedule, milestone tracking, and deadline management
- **Content Approval Workflow**: Streamlined process for reviewing and approving influencer content
- **Payment Processing**: Automated payment scheduling and tracking

### 🎯 Platform Features
- **Multi-User Collaboration**: Different access levels for team members with role-based permissions
- **Real-Time Notification System**: Instant alerts for important updates, responses, and milestones
- **Integration Capabilities**: Connect with social media platforms, analytics tools, and CRM systems
- **White-Label Solutions**: Customizable branding and interface for agencies
- **Mobile-First Design**: Full functionality across all devices with responsive design
- **API Access**: RESTful APIs for custom integrations and third-party applications

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework**: Next.js 14 with App Router for server-side rendering and optimal performance
- **Language**: TypeScript for type safety and enhanced developer experience
- **UI Framework**: React 18 with latest features including Suspense and Concurrent Features
- **Component Library**: shadcn/ui for consistent and accessible UI components
- **Styling**: Tailwind CSS for utility-first styling and rapid development
- **State Management**: React Context API with custom hooks for global state
- **Animation Library**: Framer Motion for smooth animations and transitions
- **Data Fetching**: SWR for client-side data fetching with caching and revalidation
- **Form Handling**: React Hook Form with Zod validation
- **Charts & Visualization**: Recharts for analytics dashboards

### Backend Technologies
- **API Framework**: Next.js API Routes for serverless functions
- **Server-Side Rendering**: Next.js App Router with React Server Components
- **Microservices**: Python Flask for AI processing and complex computations
- **Authentication**: JWT-based authentication with secure token management
- **Real-Time Communication**: WebSockets for live updates and notifications
- **File Processing**: Sharp for image optimization and processing
- **Email Service**: Nodemailer with SMTP integration
- **Caching**: Redis for session management and API response caching

### AI & Machine Learning
- **Large Language Model**: Google Gemini 1.5 Flash for text generation, analysis, and conversation
- **Voice Synthesis**: ElevenLabs for realistic voice generation and conversation AI
- **Voice Recognition**: ElevenLabs ConvAI for real-time voice processing
- **AI SDK**: Vercel AI SDK for streamlined AI integration and streaming responses
- **Prompt Engineering**: Custom prompt templates optimized for different use cases
- **Natural Language Processing**: Advanced NLP for search query understanding
- **Sentiment Analysis**: Real-time analysis of conversation tone and sentiment

### Data & Storage
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **File Storage**: Vercel Blob for asset storage and CDN delivery
- **Search Engine**: Elasticsearch for fast and relevant influencer search
- **Analytics**: Custom analytics pipeline with real-time data processing
- **Backup & Recovery**: Automated database backups with point-in-time recovery

### DevOps & Infrastructure
- **Deployment Platform**: Vercel for frontend and API routes
- **Container Orchestration**: Docker for Python microservices
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- **Monitoring**: Sentry for error tracking and performance monitoring
- **Logging**: Structured logging with log aggregation and analysis
- **Security**: OWASP security practices with regular vulnerability scanning

## 🏗 System Architecture

InfluAI follows a modern microservices architecture designed for scalability, reliability, and maintainability:

```
                                    ┌─────────────────────────────────┐
                                    │                                 │
                                    │        Next.js Frontend         │
                                    │     (React + TypeScript)        │
                                    │                                 │
                                    └──────────────┬──────────────────┘
                                                   │
                                                   ▼
┌─────────────────────┐              ┌─────────────────────┐              ┌─────────────────────┐
│                     │              │                     │              │                     │
│   Next.js API       │◄────────────►│   Flask Python      │◄────────────►│   AI Services       │
│   Routes            │              │   Microservice      │              │   (Gemini,          │
│   (Serverless)      │              │   (Containerized)   │              │    ElevenLabs)      │
│                     │              │                     │              │                     │
└─────────────────────┘              └─────────────────────┘              └─────────────────────┘
          │                                    │                                    │
          │                                    │                                    │
          ▼                                    ▼                                    ▼
┌─────────────────────┐              ┌─────────────────────┐              ┌─────────────────────┐
│                     │              │                     │              │                     │
│   PostgreSQL        │              │   External APIs     │              │   WebSocket         │
│   Database          │              │   (Social Media,    │              │   Connections       │
│   (Prisma ORM)      │              │    Analytics)       │              │   (Real-time)       │
│                     │              │                     │              │                     │
└─────────────────────┘              └─────────────────────┘              └─────────────────────┘
          │                                    │                                    │
          │                                    │                                    │
          ▼                                    ▼                                    ▼
┌─────────────────────┐              ┌─────────────────────┐              ┌─────────────────────┐
│                     │              │                     │              │                     │
│   Redis Cache       │              │   Elasticsearch     │              │   File Storage      │
│   (Session &        │              │   (Search Index)    │              │   (Vercel Blob)     │
│    API Cache)       │              │                     │              │                     │
│                     │              │                     │              │                     │
└─────────────────────┘              └─────────────────────┘              └─────────────────────┘
```

### Data Flow Architecture

1. **User Interaction Layer**: Users interact with the responsive Next.js frontend
2. **API Gateway**: Next.js API routes handle authentication, validation, and routing
3. **Business Logic Layer**: Python Flask microservice processes complex AI operations
4. **AI Processing Layer**: Integration with external AI services for advanced capabilities
5. **Data Persistence Layer**: PostgreSQL for structured data, Redis for caching
6. **Search Layer**: Elasticsearch for fast and relevant influencer discovery
7. **Real-Time Layer**: WebSockets for live updates and notifications
8. **External Integration Layer**: APIs for social media platforms and third-party services

### Scalability Considerations

- **Horizontal Scaling**: Microservices can be scaled independently based on demand
- **Caching Strategy**: Multi-layer caching for optimal performance
- **Database Optimization**: Read replicas and connection pooling
- **CDN Integration**: Global content delivery for static assets
- **Load Balancing**: Automatic load distribution across service instances

## 📋 Project Structure

```
influencer_platform/
├── app/                                    # Next.js app directory (App Router)
│   ├── (dashboard)/                        # Dashboard route group
│   │   ├── admin-dashboard/                # Admin dashboard pages
│   │   │   ├── loading.tsx                 # Loading UI for admin dashboard
│   │   │   └── page.tsx                    # Admin dashboard main page
│   │   ├── campaigns/                      # Campaign management
│   │   │   ├── loading.tsx                 # Campaign loading state
│   │   │   └── page.tsx                    # Campaign management interface
│   │   ├── contracts/                      # Contract management
│   │   │   ├── loading.tsx                 # Contract loading state
│   │   │   └── page.tsx                    # Contract management interface
│   │   ├── creator-discovery/              # Creator discovery interface
│   │   │   ├── loading.tsx                 # Discovery loading state
│   │   │   └── page.tsx                    # Creator discovery main page
│   │   ├── dashboard/                      # Main dashboard
│   │   │   └── page.tsx                    # Dashboard overview
│   │   ├── outreach/                       # Outreach management
│   │   │   ├── loading.tsx                 # Outreach loading state
│   │   │   └── page.tsx                    # Outreach management interface
│   │   ├── payments/                       # Payment processing
│   │   │   ├── loading.tsx                 # Payment loading state
│   │   │   └── page.tsx                    # Payment management interface
│   │   ├── performance/                    # Performance analytics
│   │   │   ├── loading.tsx                 # Analytics loading state
│   │   │   └── page.tsx                    # Performance analytics dashboard
│   │   └── layout.tsx                      # Dashboard layout with sidebar
│   ├── api/                                # API routes (serverless functions)
│   │   ├── campaign-automation/            # Campaign automation endpoints
│   │   │   └── route.ts                    # Campaign automation API
│   │   ├── get-signed-url/                 # ElevenLabs integration
│   │   │   └── route.ts                    # ElevenLabs signed URL API
│   │   └── get-signed-ws-url/              # WebSocket integration
│   │       └── route.ts                    # WebSocket signed URL API
│   ├── components/                         # App-specific components
│   │   └── conversation.tsx                # Voice conversation component
│   ├── influencers/                        # Influencer discovery pages
│   │   ├── loading.tsx                     # Influencer search loading
│   │   └── page.tsx                        # Influencer discovery interface
│   ├── globals.css                         # Global styles and Tailwind imports
│   ├── layout.tsx                          # Root layout with providers
│   ├── loading.tsx                         # Global loading component
│   └── page.tsx                            # Landing page
├── components/                             # Shared React components
│   ├── ai-call-simulation.tsx              # AI voice call simulation interface
│   ├── ai-mail-animation.tsx               # AI email generation animation
│   ├── ai-prompt-popup.tsx                 # AI prompt interface modal
│   ├── app-sidebar.tsx                     # Application sidebar navigation
│   ├── chat-ball.tsx                       # Chat interface component
│   ├── cosmic-hero.tsx                     # Hero section with cosmic effects
│   ├── create-campaign-dialog.tsx          # Campaign creation modal
│   ├── dashboard-button-wrapper.tsx        # Dashboard button components
│   ├── dashboard-preview.tsx               # Dashboard preview component
│   ├── email-chat-dialog.tsx               # Email chat interface
│   ├── floating-action-buttons.tsx         # Floating action menu
│   ├── floating-ai-button.tsx              # AI assistant floating button
│   ├── floating-call-notification.tsx      # Call notification overlay
│   ├── floating-mail-bubble.tsx            # Mail notification bubble
│   ├── go-home-button.tsx                  # Navigation home button
│   ├── header.tsx                          # Application header
│   ├── influencer-listing.tsx              # Influencer search results
│   ├── landing-hero.tsx                    # Landing page hero section
│   ├── live-call-box.tsx                   # Live call interface
│   ├── main-nav.tsx                        # Main navigation component
│   ├── minimized-call-notification.tsx     # Minimized call UI
│   ├── minimized-chat-bubble.tsx           # Minimized chat UI
│   ├── open-dashboard-button.tsx           # Dashboard access button
│   ├── search-transition.tsx               # Search animation component
│   ├── spotlight-button.tsx                # Spotlight effect button
│   ├── ui/                                 # shadcn/ui components
│   │   ├── accordion.tsx                   # Accordion component
│   │   ├── alert.tsx                       # Alert component
│   │   ├── avatar.tsx                      # Avatar component
│   │   ├── badge.tsx                       # Badge component
│   │   ├── button.tsx                      # Button component
│   │   ├── card.tsx                        # Card component
│   │   ├── dialog.tsx                      # Dialog/Modal component
│   │   ├── dropdown-menu.tsx               # Dropdown menu component
│   │   ├── input.tsx                       # Input component
│   │   ├── label.tsx                       # Label component
│   │   ├── progress.tsx                    # Progress bar component
│   │   ├── select.tsx                      # Select dropdown component
│   │   ├── separator.tsx                   # Separator component
│   │   ├── sidebar.tsx                     # Sidebar component
│   │   ├── skeleton.tsx                    # Loading skeleton component
│   │   ├── textarea.tsx                    # Textarea component
│   │   └── toast.tsx                       # Toast notification component
│   └── voice-chat-button.tsx               # Voice chat trigger button
├── context/                                # React context providers
│   ├── campaign-creation-context.tsx       # Campaign creation state management
│   └── notification-context.tsx            # Global notification system
├── hooks/                                  # Custom React hooks
│   ├── use-mobile.tsx                      # Mobile detection hook
│   └── use-toast.ts                        # Toast notification hook
├── lib/                                    # Utility libraries
│   └── utils.ts                            # Common utility functions
├── public/                                 # Static assets
│   └── cosmic-beam.png                     # Visual assets and images
├── main.py                                 # Python Flask microservice
├── requirements.txt                        # Python dependencies
├── render.yaml                             # Render deployment configuration
├── gemini-history-example.js               # Gemini API usage examples
├── next.config.mjs                         # Next.js configuration
├── tailwind.config.ts                      # Tailwind CSS configuration
├── tsconfig.json                           # TypeScript configuration
├── package.json                            # Node.js dependencies and scripts
└── README.md                               # Project documentation
```

### Component Architecture

#### Core Components
- **Layout Components**: Handle application structure and navigation
- **Feature Components**: Implement specific functionality like AI calls and email generation
- **UI Components**: Reusable interface elements from shadcn/ui
- **Context Providers**: Manage global application state

#### Page Structure
- **Landing Page**: Marketing and feature showcase
- **Dashboard Pages**: Protected routes for authenticated users
- **Discovery Pages**: Influencer search and filtering
- **Management Pages**: Campaign, contract, and payment management

## 🔍 Core Functionality

### Influencer Discovery Engine

The platform's discovery engine leverages advanced AI and search technologies to provide intelligent influencer matching:

#### Natural Language Processing
1. **Query Understanding**:
   - Parses natural language queries using advanced NLP
   - Extracts key parameters: niche, location, audience size, engagement metrics
   - Handles complex queries with multiple criteria and preferences
   - Supports conversational search refinement

2. **Intent Recognition**:
   - Identifies campaign goals from user descriptions
   - Matches campaign objectives with influencer capabilities
   - Suggests additional criteria based on campaign type
   - Provides intelligent query suggestions

3. **Semantic Search**:
   - Goes beyond keyword matching to understand context
   - Considers influencer content themes and brand alignment
   - Analyzes audience demographics and interests
   - Evaluates content quality and engagement patterns

#### Search Algorithm Implementation
```typescript
// Example search processing in app/influencers/page.tsx
const processSearchQuery = async (query: string) => {
  // 1. Parse natural language query
  const searchParams = await parseNaturalLanguage(query);
  
  // 2. Apply filters and scoring
  const results = await searchInfluencers({
    niche: searchParams.niche,
    location: searchParams.location,
    minFollowers: searchParams.minFollowers,
    maxFollowers: searchParams.maxFollowers,
    engagementRate: searchParams.engagementRate
  });
  
  // 3. Calculate relevance scores
  const scoredResults = results.map(influencer => ({
    ...influencer,
    relevanceScore: calculateRelevanceScore(influencer, searchParams),
    matchReasons: generateMatchReasons(influencer, searchParams)
  }));
  
  return scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
```

#### Results Processing and Display
1. **Relevance Scoring**:
   - Multi-factor scoring algorithm considering engagement, audience fit, content quality
   - Machine learning-based scoring improvements over time
   - Transparent scoring explanations for users
   - Customizable scoring weights based on campaign priorities

2. **Visual Presentation**:
   - Grid layout with comprehensive influencer cards
   - Key metrics prominently displayed
   - Recent content previews and engagement data
   - Quick action buttons for immediate outreach

3. **Filtering and Sorting**:
   - Real-time filtering without page reloads
   - Multiple sorting options (relevance, followers, engagement, etc.)
   - Saved search functionality
   - Export capabilities for further analysis

### AI Voice Negotiation System

The revolutionary AI voice negotiation system represents the platform's most innovative feature:

#### Preparation and Strategy Phase
1. **Profile Analysis**:
   - Deep analysis of influencer's past collaborations and pricing
   - Audience demographic analysis for campaign fit assessment
   - Content quality evaluation and brand safety checks
   - Engagement pattern analysis for optimal outreach timing

2. **Negotiation Strategy Development**:
   - AI-generated negotiation approach based on influencer profile
   - Dynamic pricing strategy with acceptable ranges
   - Conversation flow planning with multiple response scenarios
   - Fallback strategies for different negotiation outcomes

3. **Script Generation**:
   - Personalized conversation starters based on influencer interests
   - Key talking points highlighting mutual benefits
   - Objection handling scripts for common concerns
   - Closing strategies for successful deal completion

#### Real-Time Conversation Management
```typescript
// Voice conversation implementation in app/components/conversation.tsx
const VoiceConversation = () => {
  const [conversationState, setConversationState] = useState('preparing');
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleVoiceResponse = async (audioData: ArrayBuffer) => {
    // Process voice input through ElevenLabs
    const response = await processVoiceInput(audioData);
    
    // Generate AI response based on conversation context
    const aiResponse = await generateNegotiationResponse({
      userInput: response.text,
      conversationHistory: conversationHistory,
      influencerProfile: selectedInfluencer,
      campaignDetails: campaignData
    });
    
    // Synthesize voice response
    const audioResponse = await synthesizeVoice(aiResponse.text);
    
    // Update conversation state
    updateConversationState(aiResponse);
  };
  
  return (
    <div className="voice-conversation-interface">
      {/* Voice controls and visualization */}
    </div>
  );
};
```

#### Call Simulation and Visualization
1. **Step-by-Step Progress**:
   - Visual representation of negotiation phases
   - Real-time updates on conversation progress
   - Success indicators and milestone tracking
   - Conversation sentiment analysis and feedback

2. **Interactive Controls**:
   - Pause, resume, and end call functionality
   - Manual intervention options for complex situations
   - Note-taking and conversation logging
   - Call recording and playback capabilities

3. **Outcome Tracking**:
   - Automatic deal status updates
   - Success rate tracking and optimization
   - Conversation analytics and insights
   - Follow-up scheduling and reminders

### Email Automation Pipeline

The email automation system provides comprehensive outreach management:

#### Email Generation and Personalization
1. **AI-Powered Content Creation**:
   - Personalized email content based on influencer profile and campaign details
   - Dynamic subject line generation with A/B testing
   - Brand voice consistency across all communications
   - Compliance with email marketing regulations

2. **Template Management**:
   - Customizable email templates for different campaign types
   - Brand-specific styling and formatting
   - Multi-language support for global campaigns
   - Template performance analytics and optimization

3. **Personalization Engine**:
   - Deep personalization using influencer's content and interests
   - Recent post references and engagement mentions
   - Mutual connection highlighting
   - Timing optimization based on influencer activity patterns

#### Email Workflow Automation
```typescript
// Email automation implementation in components/ai-mail-animation.tsx
const EmailAutomation = () => {
  const [emailSteps, setEmailSteps] = useState([
    { id: 1, title: "Analyzing influencer profile", status: "pending" },
    { id: 2, title: "Generating personalized content", status: "pending" },
    { id: 3, title: "Optimizing send timing", status: "pending" },
    { id: 4, title: "Scheduling delivery", status: "pending" }
  ]);
  
  const generateEmail = async (influencerData: InfluencerProfile) => {
    // Step 1: Analyze influencer profile
    updateStepStatus(1, "processing");
    const analysis = await analyzeInfluencerProfile(influencerData);
    updateStepStatus(1, "completed");
    
    // Step 2: Generate personalized content
    updateStepStatus(2, "processing");
    const emailContent = await generatePersonalizedEmail({
      influencer: influencerData,
      campaign: campaignData,
      analysis: analysis
    });
    updateStepStatus(2, "completed");
    
    // Continue with remaining steps...
  };
  
  return (
    <div className="email-automation-interface">
      {/* Email generation visualization */}
    </div>
  );
};
```

#### Response Management and Follow-up
1. **Automated Response Detection**:
   - Email response monitoring and classification
   - Sentiment analysis of influencer responses
   - Automatic categorization (interested, not interested, needs more info)
   - Integration with conversation management system

2. **Follow-up Sequences**:
   - Intelligent follow-up scheduling based on response patterns
   - Escalation to human agents when needed
   - Automated reminder systems for pending responses
   - Performance tracking and optimization

3. **Conversation Threading**:
   - Maintains conversation context across multiple emails
   - Automatic conversation history compilation
   - Integration with voice negotiation system
   - Unified communication timeline

### Campaign Management Suite

Comprehensive campaign management from creation to completion:

#### Campaign Creation and Planning
1. **AI-Assisted Campaign Setup**:
   - Intelligent campaign goal setting and strategy development
   - Budget allocation recommendations based on industry benchmarks
   - Timeline planning with milestone tracking
   - Risk assessment and mitigation strategies

2. **Influencer Selection and Matching**:
   - AI-powered influencer recommendations based on campaign goals
   - Portfolio diversification suggestions
   - Budget optimization across selected influencers
   - Backup influencer identification for risk management

3. **Content Strategy Development**:
   - Content type recommendations based on campaign objectives
   - Posting schedule optimization for maximum reach
   - Hashtag and keyword strategy development
   - Brand guideline integration and compliance checking

#### Campaign Execution and Monitoring
```typescript
// Campaign automation in app/api/campaign-automation/route.ts
export async function POST(request: Request) {
  const { name, goals, industry, budget } = await request.json();
  
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const sendUpdate = (type: string, data: any) => {
        const message = `data: \${JSON.stringify({ type, data })}\\n\\n`;
        controller.enqueue(encoder.encode(message));
      };
      
      // Campaign planning phase
      sendUpdate('status', 'Analyzing campaign requirements...');
      
      // AI-powered campaign strategy generation
      generateCampaignStrategy({ name, goals, industry, budget })
        .then(strategy => {
          sendUpdate('ai_output', strategy);
          sendUpdate('status', 'Finding suitable influencers...');
          
          // Influencer discovery and matching
          return findInfluencers(strategy);
        })
        .then(influencers => {
          sendUpdate('influencers', influencers);
          sendUpdate('status', 'Campaign setup complete');
          controller.close();
        })
        .catch(error => {
          sendUpdate('error', error.message);
          controller.close();
        });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
```

#### Performance Analytics and Optimization
1. **Real-Time Metrics Tracking**:
   - Campaign performance dashboards with live updates
   - Influencer-specific performance metrics
   - ROI calculation and budget utilization tracking
   - Engagement rate monitoring and trend analysis

2. **Predictive Analytics**:
   - Campaign outcome prediction based on early performance indicators
   - Budget optimization recommendations
   - Influencer performance forecasting
   - Market trend analysis and adaptation suggestions

3. **Automated Reporting**:
   - Scheduled performance reports for stakeholders
   - Custom report generation with specific metrics
   - Comparative analysis across campaigns and time periods
   - Export capabilities for external analysis tools

## 🖥️ Backend Services

### Next.js API Routes

The platform utilizes Next.js API routes for serverless backend functionality:

#### Campaign Automation API
**Endpoint**: `/api/campaign-automation`
**Method**: POST
**Description**: Comprehensive campaign automation using AI-powered analysis and planning

**Request Body**:
```json
{
  "name": "Summer Beauty Campaign",
  "goals": "Increase brand awareness and drive sales for new skincare line",
  "industry": "Beauty & Cosmetics",
  "budget": "$50,000",
  "targetAudience": "Women aged 18-35 interested in skincare",
  "campaignDuration": "3 months",
  "contentTypes": ["posts", "stories", "reels"],
  "platforms": ["instagram", "tiktok", "youtube"]
}
```

**Response**: Server-Sent Events (SSE) stream with the following event types:
- `status`: Current automation process status
- `ai_output`: AI-generated campaign strategy and insights
- `influencers`: Recommended influencer list with matching scores
- `budget_breakdown`: Detailed budget allocation recommendations
- `timeline`: Suggested campaign timeline and milestones
- `error`: Error messages if automation fails

**Implementation Features**:
- Real-time progress updates via SSE
- AI-powered campaign strategy generation
- Intelligent influencer matching and recommendation
- Budget optimization and allocation
- Risk assessment and mitigation planning

#### ElevenLabs Integration API
**Endpoint**: `/api/get-signed-url`
**Method**: GET
**Description**: Generates secure signed URLs for ElevenLabs voice synthesis API

**Query Parameters**:
- `voiceId`: Specific voice ID for synthesis (optional)
- `model`: Voice model to use (optional)
- `stability`: Voice stability setting (optional)
- `similarity`: Voice similarity setting (optional)

**Response**:
```json
{
  "signedUrl": "https://api.elevenlabs.io/v1/text-to-speech/...",
  "expiresAt": "2024-01-01T12:00:00Z",
  "voiceSettings": {
    "stability": 0.75,
    "similarity_boost": 0.75
  }
}
```

**Security Features**:
- Time-limited signed URLs for enhanced security
- API key protection through server-side proxy
- Request validation and rate limiting
- Error handling and fallback mechanisms

#### WebSocket Integration API
**Endpoint**: `/api/get-signed-ws-url`
**Method**: POST
**Description**: Establishes secure WebSocket connections for real-time voice conversations

**Request Body**:
```json
{
  "agentId": "agent-12345",
  "conversationId": "conv-67890",
  "influencerProfile": {
    "name": "Jane Doe",
    "platform": "Instagram",
    "followers": 150000,
    "niche": "Beauty"
  },
  "campaignContext": {
    "budget": 5000,
    "deliverables": ["1 post", "3 stories"],
    "timeline": "2 weeks"
  }
}
```

**Response**:
```json
{
  "signedUrl": "wss://api.elevenlabs.io/v1/convai/conversation/...",
  "connectionId": "conn-abc123",
  "expiresAt": "2024-01-01T12:00:00Z",
  "conversationSettings": {
    "language": "en",
    "voice": "professional",
    "responseTime": "fast"
  }
}
```

**Real-Time Features**:
- Secure WebSocket connection establishment
- Conversation context management
- Real-time audio streaming
- Connection lifecycle management

### Python Flask Microservice

The Python Flask service provides advanced AI capabilities and complex data processing:

#### Service Architecture
```python
# main.py - Flask microservice structure
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Global conversation storage
conversations = {}

# AI model configuration
genai.configure(api_key=os.getenv('GOOGLE_GENERATIVE_AI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')
```

#### Negotiation API Endpoints

**Endpoint**: `/negotiate`
**Method**: POST
**Description**: Initiates AI-powered negotiation with influencers

**Request Body**:
```json
{
  "userPrompt": "Negotiate a collaboration for our skincare campaign",
  "influencerData": {
    "name": "Sarah Johnson",
    "platform": "Instagram",
    "followers": 250000,
    "niche": "Beauty & Lifestyle",
    "engagementRate": 4.2,
    "averageViews": 15000,
    "previousBrandCollabs": ["Sephora", "Glossier", "Fenty Beauty"],
    "contentTypes": ["posts", "stories", "reels"],
    "location": "Los Angeles, CA"
  },
  "campaignDetails": {
    "brand": "GlowUp Skincare",
    "budget": 8000,
    "deliverables": ["2 feed posts", "5 stories", "1 reel"],
    "timeline": "3 weeks",
    "campaignGoals": "Product launch awareness",
    "targetAudience": "Women 20-35 interested in skincare"
  }
}
```

**Response**:
```json
{
  "subject": "Exciting Collaboration Opportunity with GlowUp Skincare",
  "body": "Hi Sarah! I hope this message finds you well. I've been following your content and absolutely love your authentic approach to beauty and skincare...",
  "conversationId": "conv-uuid-12345",
  "negotiationStrategy": {
    "openingOffer": 6500,
    "maxBudget": 8000,
    "keySellingPoints": ["Brand alignment", "Audience match", "Long-term partnership potential"],
    "expectedDeliverables": ["2 feed posts", "5 stories", "1 reel"],
    "timeline": "3 weeks"
  },
  "personalizedElements": [
    "Recent post about skincare routine",
    "Collaboration with similar beauty brands",
    "Audience demographics match"
  ]
}
```

**Endpoint**: `/negotiate-conversation`
**Method**: POST
**Description**: Continues an existing negotiation conversation

**Request Body**:
```json
{
  "conversationId": "conv-uuid-12345",
  "userMessage": "Thanks for reaching out! I'm interested but my rate for this package would be $7,500",
  "influencerData": { /* same as above */ },
  "campaignDetails": { /* same as above */ }
}
```

**Response**:
```json
{
  "response": "I appreciate your interest, Sarah! Your rate is very reasonable given your engagement and audience quality. We can definitely work with $7,500. Would you be open to including usage rights for 6 months as part of this package?",
  "conversationId": "conv-uuid-12345",
  "negotiationStatus": "in_progress",
  "currentOffer": 7500,
  "nextSteps": ["Discuss usage rights", "Finalize timeline", "Send contract"],
  "sentiment": "positive",
  "dealProbability": 0.85
}
```

#### Advanced AI Processing Features

1. **Context-Aware Responses**:
   - Maintains conversation history and context
   - Adapts negotiation strategy based on influencer responses
   - Personalizes communication style to match influencer preferences
   - Incorporates real-time market data and pricing insights

2. **Sentiment Analysis**:
   - Real-time sentiment analysis of influencer responses
   - Emotional intelligence in conversation management
   - Escalation triggers for human intervention
   - Success probability calculation

3. **Dynamic Pricing Strategy**:
   - Market-rate analysis for fair pricing
   - Budget optimization within campaign constraints
   - Value-based pricing recommendations
   - ROI prediction and optimization

#### Health and Monitoring Endpoints

**Endpoint**: `/health`
**Method**: GET
**Description**: Service health check and status monitoring

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "model": "gemini-1.5-flash",
  "active_conversations": 15,
  "total_conversations_today": 247,
  "average_response_time": "1.2s",
  "success_rate": 0.94,
  "memory_usage": "245MB",
  "uptime": "72h 15m 30s"
}
```

**Endpoint**: `/metrics`
**Method**: GET
**Description**: Detailed service metrics and analytics

**Response**:
```json
{
  "performance_metrics": {
    "total_negotiations": 1247,
    "successful_negotiations": 1089,
    "success_rate": 0.873,
    "average_negotiation_time": "4.5 minutes",
    "average_deal_value": 4250
  },
  "ai_metrics": {
    "model_accuracy": 0.91,
    "response_relevance": 0.88,
    "conversation_completion_rate": 0.76
  },
  "system_metrics": {
    "cpu_usage": "45%",
    "memory_usage": "67%",
    "disk_usage": "23%",
    "network_latency": "12ms"
  }
}
```

### AI Integration Layer

#### Google Gemini Integration

The platform leverages Google's Gemini 1.5 Flash model for various AI-powered features:

1. **Campaign Strategy Generation**:
   - Analyzes campaign goals and generates comprehensive strategies
   - Provides market insights and competitive analysis
   - Suggests optimal influencer mix and content strategies
   - Generates timeline and milestone recommendations

2. **Influencer Analysis and Matching**:
   - Deep analysis of influencer profiles and content
   - Audience demographic analysis and brand fit assessment
   - Content quality evaluation and engagement prediction
   - Risk assessment for brand safety and reputation

3. **Content Generation and Optimization**:
   - Personalized email content creation
   - Social media content suggestions and optimization
   - Hashtag and keyword strategy development
   - A/B testing recommendations for content performance

4. **Negotiation Intelligence**:
   - Dynamic negotiation strategy development
   - Real-time response generation during conversations
   - Sentiment analysis and emotional intelligence
   - Deal optimization and success probability calculation

#### ElevenLabs Voice Integration

Advanced voice synthesis and conversation capabilities:

1. **Voice Synthesis Features**:
   - Natural-sounding voice generation with emotional nuance
   - Multiple voice options for different conversation styles
   - Real-time voice synthesis for dynamic conversations
   - Voice cloning capabilities for brand consistency

2. **Conversation AI**:
   - Real-time voice conversation processing
   - Natural language understanding and response generation
   - Context-aware conversation management
   - Multi-turn conversation handling with memory

3. **Audio Processing**:
   - High-quality audio encoding and streaming
   - Noise reduction and audio enhancement
   - Real-time audio analysis and feedback
   - Recording and playback capabilities

### WebSocket Services

Real-time communication infrastructure for live features:

#### Connection Management
```typescript
// WebSocket connection handling
class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  
  async establishConnection(userId: string, conversationId: string) {
    const signedUrl = await this.getSignedWebSocketUrl(conversationId);
    const ws = new WebSocket(signedUrl);
    
    ws.onopen = () => {
      this.connections.set(userId, ws);
      this.sendConnectionStatus(userId, 'connected');
    };
    
    ws.onmessage = (event) => {
      this.handleIncomingMessage(userId, event.data);
    };
    
    ws.onclose = () => {
      this.connections.delete(userId);
      this.sendConnectionStatus(userId, 'disconnected');
    };
    
    return ws;
  }
  
  sendMessage(userId: string, message: any) {
    const connection = this.connections.get(userId);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }
}
```

#### Real-Time Features
1. **Live Conversation Updates**:
   - Real-time message delivery and status updates
   - Typing indicators and presence information
   - Message read receipts and delivery confirmations
   - Connection quality monitoring and optimization

2. **Notification System**:
   - Instant notifications for important events
   - Customizable notification preferences
   - Multi-channel notification delivery
   - Notification history and management

3. **Collaborative Features**:
   - Real-time collaboration on campaigns
   - Live editing and commenting capabilities
   - Team presence and activity indicators
   - Conflict resolution for simultaneous edits

## 🎨 Frontend Architecture

### Component Hierarchy and Design System

The frontend follows a modular component architecture with a comprehensive design system:

#### Design System Components
```typescript
// Component hierarchy example
interface DesignSystemProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: 'default' | 'hover' | 'active' | 'disabled';
}

// Button component with design system integration
const Button = ({ variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    ghost: 'hover:bg-gray-100'
  };
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
    xl: 'h-14 px-8 text-xl'
  };
  
  return (
    <button 
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      {...props}
    />
  );
};
```

#### State Management Architecture
```typescript
// Global state management with React Context
interface AppState {
  user: User | null;
  campaigns: Campaign[];
  notifications: Notification[];
  ui: UIState;
}

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
} | null>(null);

// Custom hooks for state management
const useCampaigns = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useCampaigns must be used within AppProvider');
  
  return {
    campaigns: context.state.campaigns,
    createCampaign: (campaign: CreateCampaignInput) => 
      context.dispatch({ type: 'CREATE_CAMPAIGN', payload: campaign }),
    updateCampaign: (id: string, updates: Partial<Campaign>) =>
      context.dispatch({ type: 'UPDATE_CAMPAIGN', payload: { id, updates } }),
    deleteCampaign: (id: string) =>
      context.dispatch({ type: 'DELETE_CAMPAIGN', payload: id })
  };
};
```

### Advanced UI Components

#### AI Call Simulation Component
```typescript
// components/ai-call-simulation.tsx - Advanced call simulation
const AICallSimulation = ({ influencer, campaign }: CallSimulationProps) => {
  const [callState, setCallState] = useState<CallState>('preparing');
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  
  const callSteps = [
    { id: 1, title: "Analyzing influencer profile", duration: 2000 },
    { id: 2, title: "Preparing negotiation strategy", duration: 3000 },
    { id: 3, title: "Initiating call connection", duration: 1500 },
    { id: 4, title: "Starting conversation", duration: 1000 }
  ];
  
  const simulateCall = async () => {
    setCallState('preparing');
    
    for (const step of callSteps) {
      setCurrentStep(step.id);
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }
    
    setCallState('active');
    await startVoiceConversation();
  };
  
  const startVoiceConversation = async () => {
    const wsUrl = await getSignedWebSocketUrl({
      agentId: process.env.NEXT_PUBLIC_AGENT_ID,
      influencerProfile: influencer,
      campaignContext: campaign
    });
    
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleConversationUpdate(message);
    };
  };
  
  return (
    <div className="call-simulation-container">
      <CallHeader influencer={influencer} state={callState} />
      <CallProgress steps={callSteps} currentStep={currentStep} />
      <ConversationInterface 
        history={conversationHistory}
        onSendMessage={handleSendMessage}
      />
      <CallControls 
        state={callState}
        onStart={simulateCall}
        onEnd={endCall}
        onMute={toggleMute}
      />
    </div>
  );
};
```

#### Email Generation Animation Component
```typescript
// components/ai-mail-animation.tsx - Email generation with animation
const AIMailAnimation = ({ influencer, campaign }: EmailAnimationProps) => {
  const [emailSteps, setEmailSteps] = useState([
    { id: 1, title: "Analyzing influencer profile", status: "pending" },
    { id: 2, title: "Researching recent content", status: "pending" },
    { id: 3, title: "Generating personalized subject", status: "pending" },
    { id: 4, title: "Crafting email body", status: "pending" },
    { id: 5, title: "Optimizing for engagement", status: "pending" }
  ]);
  
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  
  const generateEmail = async () => {
    for (let i = 0; i < emailSteps.length; i++) {
      updateStepStatus(i + 1, "processing");
      
      switch (i) {
        case 0:
          await analyzeInfluencerProfile(influencer);
          break;
        case 1:
          await researchRecentContent(influencer);
          break;
        case 2:
          await generateSubjectLine(influencer, campaign);
          break;
        case 3:
          await generateEmailBody(influencer, campaign);
          break;
        case 4:
          const email = await optimizeForEngagement(influencer, campaign);
          setGeneratedEmail(email);
          break;
      }
      
      updateStepStatus(i + 1, "completed");
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };
  
  return (
    <div className="email-animation-container">
      <AnimatedSteps steps={emailSteps} />
      {generatedEmail && (
        <EmailPreview 
          email={generatedEmail}
          onEdit={handleEmailEdit}
          onSend={handleEmailSend}
        />
      )}
    </div>
  );
};
```

### Responsive Design and Mobile Optimization

#### Mobile-First Approach
```css
/* Responsive design with Tailwind CSS */
.influencer-grid {
  @apply grid gap-4;
  @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}

.dashboard-layout {
  @apply flex flex-col lg:flex-row;
}

.sidebar {
  @apply w-full lg:w-64 lg:fixed lg:h-screen;
  @apply transform -translate-x-full lg:translate-x-0;
  @apply transition-transform duration-300 ease-in-out;
}

.main-content {
  @apply flex-1 lg:ml-64 p-4 lg:p-8;
}

/* Mobile navigation */
.mobile-nav {
  @apply lg:hidden fixed bottom-0 left-0 right-0;
  @apply bg-white border-t border-gray-200;
  @apply flex justify-around items-center h-16;
}
```

#### Touch-Friendly Interface
1. **Gesture Support**:
   - Swipe gestures for navigation
   - Pull-to-refresh functionality
   - Touch-friendly button sizes (minimum 44px)
   - Optimized scroll behavior

2. **Mobile-Specific Features**:
   - Bottom navigation for easy thumb access
   - Collapsible sections to save screen space
   - Mobile-optimized modals and overlays
   - Adaptive typography for readability

## 🔒 Authentication & Security

### Authentication System

#### JWT-Based Authentication
```typescript
// Authentication implementation
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const { user, token } = await response.json();
      
      // Store token securely
      localStorage.setItem('auth_token', token);
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };
  
  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };
  
  return { ...authState, login, logout };
};
```

#### Role-Based Access Control
```typescript
// RBAC implementation
enum UserRole {
  ADMIN = 'admin',
  AGENCY_OWNER = 'agency_owner',
  CAMPAIGN_MANAGER = 'campaign_manager',
  FREELANCER = 'freelancer'
}

interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    { resource: '*', action: 'create' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'update' },
    { resource: '*', action: 'delete' }
  ],
  [UserRole.AGENCY_OWNER]: [
    { resource: 'campaigns', action: 'create' },
    { resource: 'campaigns', action: 'read' },
    { resource: 'campaigns', action: 'update' },
    { resource: 'team', action: 'create' },
    { resource: 'team', action: 'read' },
    { resource: 'analytics', action: 'read' }
  ],
  [UserRole.CAMPAIGN_MANAGER]: [
    { resource: 'campaigns', action: 'read' },
    { resource: 'campaigns', action: 'update' },
    { resource: 'influencers', action: 'read' },
    { resource: 'outreach', action: 'create' },
    { resource: 'outreach', action: 'read' }
  ],
  [UserRole.FREELANCER]: [
    { resource: 'campaigns', action: 'read' },
    { resource: 'influencers', action: 'read' },
    { resource: 'outreach', action: 'create' }
  ]
};

const hasPermission = (userRole: UserRole, resource: string, action: string): boolean => {
  const permissions = rolePermissions[userRole];
  return permissions.some(p => 
    (p.resource === '*' || p.resource === resource) && p.action === action
  );
};
```

### Security Measures

#### API Security
1. **Request Validation**:
   - Input sanitization and validation
   - SQL injection prevention
   - XSS protection
   - CSRF token validation

2. **Rate Limiting**:
   - API endpoint rate limiting
   - User-based rate limiting
   - IP-based rate limiting
   - Adaptive rate limiting based on usage patterns

3. **Data Protection**:
   - Encryption at rest and in transit
   - Secure API key management
   - Environment variable protection
   - Sensitive data masking in logs

#### Frontend Security
```typescript
// Security utilities
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000); // Limit input length
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const secureApiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  return fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer \${token}`,
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers
    }
  });
};
```

## 📊 Database Schema

### Core Entities and Relationships

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role user_role NOT NULL DEFAULT 'freelancer',
  company_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  subscription_tier subscription_tier DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  goals TEXT NOT NULL,
  industry VARCHAR(100) NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  start_date DATE,
  end_date DATE,
  status campaign_status DEFAULT 'draft',
  target_audience JSONB,
  content_requirements JSONB,
  brand_guidelines JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Influencers table
CREATE TABLE influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  platform platform_type NOT NULL,
  followers_count INTEGER NOT NULL,
  engagement_rate DECIMAL(5,2),
  average_views INTEGER,
  niche VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  bio TEXT,
  profile_image_url TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  rates JSONB, -- Pricing for different content types
  past_collaborations JSONB,
  audience_demographics JSONB,
  content_categories JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaign Influencers (Many-to-Many relationship)
CREATE TABLE campaign_influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES influencers(id) ON DELETE CASCADE,
  status outreach_status DEFAULT 'pending',
  offered_rate DECIMAL(10,2),
  agreed_rate DECIMAL(10,2),
  deliverables JSONB,
  timeline JSONB,
  contract_signed BOOLEAN DEFAULT FALSE,
  content_submitted BOOLEAN DEFAULT FALSE,
  payment_status payment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(campaign_id, influencer_id)
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_influencer_id UUID REFERENCES campaign_influencers(id) ON DELETE CASCADE,
  type conversation_type NOT NULL, -- 'email' or 'voice'
  status conversation_status DEFAULT 'active',
  ai_agent_id VARCHAR(255),
  conversation_data JSONB, -- Stores conversation history
  sentiment_score DECIMAL(3,2), -- -1 to 1
  success_probability DECIMAL(3,2), -- 0 to 1
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender message_sender NOT NULL, -- 'ai', 'user', 'influencer'
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text', -- 'text', 'audio', 'image'
  metadata JSONB, -- Additional message data
  sent_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES influencers(id),
  metric_type analytics_metric NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  metric_date DATE NOT NULL,
  additional_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'agency_owner', 'campaign_manager', 'freelancer');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'professional', 'enterprise');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed', 'cancelled');
CREATE TYPE platform_type AS ENUM ('instagram', 'tiktok', 'youtube', 'twitter', 'linkedin');
CREATE TYPE outreach_status AS ENUM ('pending', 'contacted', 'responded', 'negotiating', 'agreed', 'declined');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE conversation_type AS ENUM ('email', 'voice', 'chat');
CREATE TYPE conversation_status AS ENUM ('active', 'completed', 'failed', 'cancelled');
CREATE TYPE message_sender AS ENUM ('ai', 'user', 'influencer');
CREATE TYPE message_type AS ENUM ('text', 'audio', 'image', 'file');
CREATE TYPE analytics_metric AS ENUM ('impressions', 'engagement', 'clicks', 'conversions', 'reach');
CREATE TYPE notification_type AS ENUM ('campaign_update', 'influencer_response', 'payment_update', 'system_alert');

-- Indexes for performance
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_influencers_platform ON influencers(platform);
CREATE INDEX idx_influencers_niche ON influencers(niche);
CREATE INDEX idx_influencers_followers ON influencers(followers_count);
CREATE INDEX idx_campaign_influencers_campaign_id ON campaign_influencers(campaign_id);
CREATE INDEX idx_campaign_influencers_status ON campaign_influencers(status);
CREATE INDEX idx_conversations_campaign_influencer_id ON conversations(campaign_influencer_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at);
CREATE INDEX idx_analytics_campaign_id ON analytics(campaign_id);
CREATE INDEX idx_analytics_metric_date ON analytics(metric_date);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### Data Relationships and Constraints

#### Primary Relationships
1. **Users → Campaigns**: One-to-many relationship where users can create multiple campaigns
2. **Campaigns → Influencers**: Many-to-many relationship through campaign_influencers table
3. **Campaign Influencers → Conversations**: One-to-many for tracking all communication
4. **Conversations → Messages**: One-to-many for storing conversation history
5. **Campaigns → Analytics**: One-to-many for performance tracking

#### Data Integrity Constraints
```sql
-- Foreign key constraints with cascading deletes
ALTER TABLE campaigns ADD CONSTRAINT fk_campaigns_user_id 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE campaign_influencers ADD CONSTRAINT fk_campaign_influencers_campaign_id 
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE;

ALTER TABLE campaign_influencers ADD CONSTRAINT fk_campaign_influencers_influencer_id 
  FOREIGN KEY (influencer_id) REFERENCES influencers(id) ON DELETE CASCADE;

-- Check constraints for data validation
ALTER TABLE influencers ADD CONSTRAINT chk_followers_positive 
  CHECK (followers_count >= 0);

ALTER TABLE influencers ADD CONSTRAINT chk_engagement_rate_valid 
  CHECK (engagement_rate >= 0 AND engagement_rate &lt;= 100);

ALTER TABLE campaigns ADD CONSTRAINT chk_budget_positive 
  CHECK (budget > 0);

ALTER TABLE campaigns ADD CONSTRAINT chk_date_range_valid 
  CHECK (end_date >= start_date);

