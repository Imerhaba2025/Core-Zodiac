# Quick Start Guide

Get Core-Zodiac up and running in 5 minutes!

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)

## Option 1: Quick Start with Docker (Recommended)

This is the fastest way to get started!

### 1. Clone the Repository

```bash
git clone https://github.com/Imerhaba2025/Core-Zodiac.git
cd Core-Zodiac
```

### 2. Start All Services

```bash
docker-compose up -d
```

That's it! The platform will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

### 3. Create Your First Account

1. Open http://localhost:3000 in your browser
2. Click "Get Started" or "Register"
3. Fill in your details and create an account
4. You're ready to go!

### 4. Explore Features

#### Create a Landing Page
1. Go to Dashboard → Landing Pages
2. Click "Create New"
3. Try the AI Generator or use a template
4. Customize and publish!

#### Set Up Your Shop
1. Go to Dashboard → Products
2. Add your first product
3. Set pricing and inventory
4. Start selling!

#### Try the AI Chatbot
1. Look for the chat widget in the bottom right
2. Click to open
3. Ask questions about features
4. See AI responses in real-time

## Option 2: Manual Setup

If you prefer not to use Docker:

### 1. Clone and Install

```bash
git clone https://github.com/Imerhaba2025/Core-Zodiac.git
cd Core-Zodiac
npm run install:all
```

### 2. Set Up Database

Install PostgreSQL, then:
```bash
createdb core_zodiac
cd backend
cp .env.example .env
# Edit .env and set DATABASE_URL
npx prisma migrate dev
```

### 3. Set Up Frontend

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local if needed
```

### 4. Start Development Servers

```bash
# From root directory
npm run dev
```

Or in separate terminals:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Next Steps

### Configure AI Features

To enable AI-powered features:

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Add to `backend/.env`:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart the backend server

### Set Up Payments

To enable payment processing:

1. Get Stripe keys from https://dashboard.stripe.com/apikeys
2. Add to `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_your-key
   ```
3. Add to `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
   ```
4. Restart both servers

### Customize Your Platform

1. **Branding**
   - Update colors in `frontend/tailwind.config.js`
   - Replace logo files in `frontend/public/`

2. **Content**
   - Edit homepage in `frontend/src/pages/index.tsx`
   - Update metadata in `frontend/src/pages/_document.tsx`

## Common Tasks

### Stop All Services (Docker)

```bash
docker-compose down
```

### View Logs (Docker)

```bash
docker-compose logs -f
```

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

### Run Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Getting Help

- 📖 [Full Documentation](./docs/)
- 🐛 [Report Issues](https://github.com/Imerhaba2025/Core-Zodiac/issues)
- 💬 [Ask Questions](https://github.com/Imerhaba2025/Core-Zodiac/discussions)

## What's Next?

Check out these guides:
- [Development Guide](./docs/DEVELOPMENT.md) - Deep dive into development
- [API Documentation](./docs/API.md) - Learn about the API
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to production
- [Configuration Guide](./docs/CONFIGURATION.md) - Advanced configuration

## Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error

Make sure PostgreSQL is running:
```bash
# With Docker
docker-compose up db -d

# Without Docker (Mac)
brew services start postgresql

# Without Docker (Linux)
sudo systemctl start postgresql
```

### Module Not Found

Make sure all dependencies are installed:
```bash
npm run install:all
```

## Success! 🎉

You now have Core-Zodiac running locally. Start building amazing landing pages!

For questions or issues, open an issue on GitHub or check our documentation.
