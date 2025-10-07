# Development Guide

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- PostgreSQL 15+
- Redis 7+
- Git

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/Imerhaba2025/Core-Zodiac.git
cd Core-Zodiac
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**

Create `.env` file in backend directory:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your values:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/core_zodiac"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key"
```

Create `.env.local` in frontend directory:
```bash
cd ../frontend
cp .env.local.example .env.local
```

4. **Initialize the database**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

5. **Start development servers**

From the root directory:
```bash
npm run dev
```

Or start services separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

```
Core-Zodiac/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Next.js pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities
│   │   ├── store/           # State management
│   │   └── styles/          # CSS styles
│   └── package.json
│
└── docs/                    # Documentation
```

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
- Write code
- Add tests
- Update documentation

3. **Test your changes**
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

4. **Commit and push**
```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

## Backend Development

### Adding a New API Endpoint

1. **Create a controller** (`backend/src/controllers/yourFeature.controller.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';

export const yourHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Your logic here
    res.json({ status: 'success', data: {} });
  } catch (error) {
    next(error);
  }
};
```

2. **Create a route** (`backend/src/routes/yourFeature.routes.ts`)
```typescript
import { Router } from 'express';
import { yourHandler } from '../controllers/yourFeature.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, yourHandler);

export default router;
```

3. **Register the route** (`backend/src/index.ts`)
```typescript
import yourFeatureRoutes from './routes/yourFeature.routes';

app.use('/api/your-feature', yourFeatureRoutes);
```

### Working with Prisma

**Creating a new model:**

1. Edit `backend/prisma/schema.prisma`
2. Add your model
3. Run migration:
```bash
npx prisma migrate dev --name add_your_model
```

**Generating Prisma Client:**
```bash
npx prisma generate
```

**Viewing database:**
```bash
npx prisma studio
```

## Frontend Development

### Creating a New Page

Create a file in `frontend/src/pages/`:
```typescript
// frontend/src/pages/your-page.tsx
import Head from 'next/head';

export default function YourPage() {
  return (
    <>
      <Head>
        <title>Your Page</title>
      </Head>
      <div>
        {/* Your content */}
      </div>
    </>
  );
}
```

### Creating a Component

Create a file in `frontend/src/components/`:
```typescript
// frontend/src/components/YourComponent.tsx
interface Props {
  title: string;
}

export function YourComponent({ title }: Props) {
  return <div>{title}</div>;
}
```

### Making API Calls

```typescript
import api from '@/lib/api';

const fetchData = async () => {
  try {
    const response = await api.get('/api/your-endpoint');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

## Testing

### Backend Testing

Create test files next to your source files:
```typescript
// backend/src/controllers/__tests__/auth.controller.test.ts
describe('Auth Controller', () => {
  it('should register a user', async () => {
    // Test implementation
  });
});
```

Run tests:
```bash
cd backend
npm test
```

### Frontend Testing

Create test files:
```typescript
// frontend/src/components/__tests__/YourComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { YourComponent } from '../YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Avoid `any` type
- Use explicit return types for functions

### Naming Conventions

- **Files**: camelCase.ts or PascalCase.tsx for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Components**: PascalCase
- **Functions**: camelCase

### Code Formatting

We use Prettier for code formatting. Run:
```bash
npm run format
```

## Database

### Migrations

Create a new migration:
```bash
npx prisma migrate dev --name your_migration_name
```

Apply migrations in production:
```bash
npx prisma migrate deploy
```

Reset database (development only):
```bash
npx prisma migrate reset
```

## Debugging

### Backend Debugging

1. Add breakpoints in your IDE
2. Start with debugger:
```bash
npm run dev:debug
```

### Frontend Debugging

Use React DevTools and browser developer tools.

## Common Issues

### Port Already in Use

Kill the process using the port:
```bash
# Linux/Mac
lsof -ti:4000 | xargs kill -9

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Database Connection Issues

Check that PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

### Redis Connection Issues

Check that Redis is running:
```bash
sudo systemctl status redis
```

## Performance Tips

1. Use database indexes for frequently queried fields
2. Implement caching for expensive operations
3. Use pagination for large datasets
4. Optimize images and assets
5. Use code splitting in frontend

## Security Best Practices

1. Never commit sensitive data
2. Use environment variables for secrets
3. Validate all user inputs
4. Use parameterized queries
5. Keep dependencies updated
6. Use HTTPS in production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
