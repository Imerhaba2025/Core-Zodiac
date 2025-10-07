# Architecture Documentation

## System Overview

Core-Zodiac is a multi-tenant AI-powered platform designed to help businesses create landing pages, manage e-commerce operations, and engage customers through intelligent chatbots.

## Architecture Layers

### 1. Frontend Layer (Next.js + React)

**Technology Stack:**
- Next.js 14 for server-side rendering and routing
- React 18 for UI components
- TailwindCSS for styling
- Zustand for state management
- Socket.IO Client for real-time communication
- PWA support for offline capabilities

**Key Features:**
- Responsive design for mobile, tablet, and desktop
- Progressive Web App (PWA) capabilities
- Multi-language support (i18n)
- SEO optimization
- Real-time chat interface
- Admin dashboard

### 2. Backend Layer (Node.js + Express)

**Technology Stack:**
- Node.js 18+ runtime
- Express.js for REST API
- TypeScript for type safety
- Prisma ORM for database access
- Socket.IO for WebSocket connections
- JWT for authentication
- bcrypt for password hashing

**Key Components:**

#### Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Multi-tenant isolation
- Session management

#### API Endpoints
- RESTful API design
- Versioned endpoints
- Request validation
- Error handling
- Rate limiting

#### Real-time Services
- WebSocket connections for chat
- Live notifications
- Real-time updates

### 3. AI Layer (OpenAI Integration)

**Capabilities:**
- Landing page content generation
- Product description creation
- Ad campaign content generation
- Chatbot responses
- SEO optimization suggestions

**Models Used:**
- GPT-4 Turbo for content generation
- Custom prompts for specific use cases
- Context-aware responses

### 4. Database Layer (PostgreSQL)

**Schema Design:**

```
Users
├── Tenants (Multi-tenancy)
├── Landing Pages
├── Products
├── Orders
│   └── Order Items
├── Chat Sessions
│   └── Chat Messages
├── Ad Campaigns
└── AI Templates
```

**Key Features:**
- Foreign key relationships
- Indexed queries for performance
- Transaction support
- Data integrity constraints

### 5. Cache Layer (Redis)

**Use Cases:**
- Session storage
- API response caching
- Rate limiting
- Real-time data
- Queue management

## Data Flow

### User Registration Flow
```
1. User submits registration form
2. Frontend validates input
3. API receives request
4. Backend validates data
5. Password is hashed
6. User is created in database
7. JWT token is generated
8. Response sent to frontend
9. User is redirected to dashboard
```

### AI Content Generation Flow
```
1. User requests AI content
2. Frontend sends request to API
3. Backend validates user permissions
4. Request is sent to OpenAI
5. AI generates content
6. Content is processed and formatted
7. Response is cached
8. Content is returned to user
```

### Chat Flow
```
1. User connects via WebSocket
2. User joins chat session
3. User sends message
4. Message is saved to database
5. Message is broadcast to session
6. AI processes message
7. AI response is generated
8. Response is saved and broadcast
```

## Security Architecture

### Authentication
- JWT tokens with expiration
- Refresh token mechanism
- Secure password storage (bcrypt)
- Email verification (optional)

### Authorization
- Role-based access control
- Resource ownership validation
- Tenant isolation
- Permission checks

### Data Protection
- HTTPS encryption in transit
- Database encryption at rest
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection
- Rate limiting

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Session storage in Redis
- Database connection pooling
- Load balancing support

### Vertical Scaling
- Optimized database queries
- Caching strategies
- CDN for static assets
- Code splitting in frontend

### Performance Optimization
- Database indexing
- Query optimization
- Response caching
- Lazy loading
- Image optimization
- Compression (gzip)

## Multi-Tenancy Design

### Tenant Isolation
- Data segregation by tenantId
- Separate domains/subdomains
- Custom branding per tenant
- Resource limits per tenant

### Tenant Management
- Super admin controls
- Tenant creation/deletion
- Subscription management
- Usage tracking

## Monitoring & Logging

### Application Monitoring
- Error tracking
- Performance metrics
- User analytics
- API usage statistics

### Infrastructure Monitoring
- Server health checks
- Database performance
- Cache hit rates
- Network latency

### Logging
- Structured logging
- Log aggregation
- Error logs
- Access logs
- Audit logs

## Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (localhost:3000)
├── Backend (localhost:4000)
├── PostgreSQL (localhost:5432)
└── Redis (localhost:6379)
```

### Production Environment
```
Load Balancer
├── Frontend Server (N instances)
├── Backend Server (N instances)
├── PostgreSQL Cluster (Primary + Replicas)
├── Redis Cluster
└── File Storage (S3/CDN)
```

## Integration Points

### Third-Party Services
- OpenAI API for AI features
- Stripe for payment processing
- AWS S3 for file storage
- SendGrid for email
- Analytics services

### Webhooks
- Payment confirmations
- Order updates
- User events
- System notifications

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Point-in-time recovery
- File storage backups
- Configuration backups

### Recovery Plan
- Database restoration
- Service failover
- Data replication
- Incident response

## Future Enhancements

1. **Mobile Applications**
   - iOS app
   - Android app
   - React Native implementation

2. **Advanced AI Features**
   - Image generation
   - Voice chat
   - Sentiment analysis
   - Personalization engine

3. **Analytics & Reporting**
   - Advanced dashboards
   - Custom reports
   - Data export
   - Visualization tools

4. **Integration Marketplace**
   - Third-party integrations
   - API marketplace
   - Plugin system
   - Custom extensions
