# Core-Zodiac - AI Landing Page Generator Platform

A comprehensive AI-powered platform for creating landing pages, managing e-commerce, and engaging customers with intelligent chatbots.

## 🌟 Features

### 1. **Landing Page Generator**
- AI-powered content generation
- Multiple templates and themes
- Drag-and-drop editor
- SEO optimization
- Analytics integration

### 2. **AI Sales Chatbot**
- 24/7 customer engagement
- Natural language understanding
- Product recommendations
- Live chat integration
- Multi-language support

### 3. **Mini Shop**
- Product management
- Inventory tracking
- Order processing
- Payment integration (Stripe)
- Customer management

### 4. **Admin Panel (Multi-Tenant)**
- Tenant management
- User roles and permissions
- Analytics dashboard
- Subscription management
- System configuration

### 5. **AI Management & Automation**
- Auto-ads generator for campaigns
- Content generation
- Task automation
- Performance analytics

## 🎯 User Roles

| Role | Permissions |
|------|------------|
| **Super Admin** | Full control over the entire platform |
| **Admin** | Manage vendors and tenants |
| **Vendor/Supplier** | Manage products and inventory |
| **Agent** | Customer support and chat management |
| **Customer** | Browse, shop, and engage with chatbot |

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│   AI Layer  │
│  (Next.js)  │     │  (Node.js)  │     │  (OpenAI)   │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                     │
      │                    ▼                     │
      │             ┌─────────────┐             │
      │             │  PostgreSQL │             │
      │             └─────────────┘             │
      │                    │                     │
      └────────────────────┴─────────────────────┘
                          │
                    ┌─────────────┐
                    │    Redis    │
                    └─────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- OpenAI API key (optional, for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Imerhaba2025/Core-Zodiac.git
cd Core-Zodiac
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.local.example frontend/.env.local
# Edit frontend/.env.local with your configuration
```

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

5. Start the development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Using Docker

```bash
docker-compose up -d
```

## 📁 Project Structure

```
Core-Zodiac/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── pages/        # Next.js pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and API client
│   │   ├── store/        # State management (Zustand)
│   │   └── styles/       # CSS styles
│   └── public/           # Static files
│
├── backend/              # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Express middleware
│   │   └── types/        # TypeScript types
│   └── prisma/           # Database schema
│
├── ai-layer/             # AI integration documentation
├── docs/                 # Additional documentation
└── config/               # Configuration files
```

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet.js security headers
- SQL injection protection (Prisma ORM)

## 🌍 Multi-Language Support

The platform supports multiple languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)

## 📱 PWA Support

The frontend is configured as a Progressive Web App with:
- Offline support
- Install to home screen
- Push notifications (future)
- Responsive design

## 💳 Payment Integration

Stripe integration for:
- One-time payments
- Subscription billing
- Webhook handling
- Payment processing

## 📊 API Documentation

### Authentication

```bash
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/refresh
```

### Landing Pages

```bash
GET    /api/landing-pages
POST   /api/landing-pages
GET    /api/landing-pages/:id
PUT    /api/landing-pages/:id
DELETE /api/landing-pages/:id
POST   /api/landing-pages/:id/publish
```

### Products

```bash
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```bash
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
```

### Chat

```bash
POST   /api/chat/sessions
GET    /api/chat/sessions
GET    /api/chat/sessions/:sessionId/messages
POST   /api/chat/sessions/:sessionId/messages
```

### AI

```bash
POST   /api/ai/generate/landing-page
POST   /api/ai/generate/ad-content
POST   /api/ai/generate/product-description
POST   /api/ai/chat
```

### Ad Campaigns

```bash
GET    /api/ad-campaigns
POST   /api/ad-campaigns
GET    /api/ad-campaigns/:id
PUT    /api/ad-campaigns/:id
DELETE /api/ad-campaigns/:id
```

### Tenants (Super Admin only)

```bash
GET    /api/tenants
POST   /api/tenants
GET    /api/tenants/:id
PUT    /api/tenants/:id
DELETE /api/tenants/:id
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend

1. Build the backend:
```bash
cd backend
npm run build
```

2. Run migrations:
```bash
npx prisma migrate deploy
```

3. Start the server:
```bash
npm start
```

### Frontend

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the server:
```bash
npm start
```

### Docker Deployment

```bash
docker-compose -f docker-compose.yml up -d
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@core-zodiac.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Advanced AI features
- [ ] More payment gateways
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics
- [ ] Email marketing integration
- [ ] Social media integration
- [ ] More language support
- [ ] White-label solutions

## 💡 Acknowledgments

- OpenAI for AI capabilities
- Next.js team for the amazing framework
- Prisma for the database toolkit
- All contributors and users
