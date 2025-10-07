# Configuration Guide

## Environment Variables

### Backend Configuration

Create a `.env` file in the `backend/` directory with the following variables:

#### Server Configuration
```env
# Server port
PORT=4000

# Environment (development, production, test)
NODE_ENV=development
```

#### Database Configuration
```env
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://postgres:password@localhost:5432/core_zodiac"

# Enable query logging (development only)
DATABASE_LOGGING=true
```

#### Redis Configuration
```env
# Redis connection string
REDIS_URL="redis://localhost:6379"

# Redis password (if configured)
REDIS_PASSWORD=""
```

#### Authentication
```env
# JWT secret key (use a strong, random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# JWT token expiration
JWT_EXPIRES_IN=7d

# Refresh token expiration
REFRESH_TOKEN_EXPIRES_IN=30d
```

#### OpenAI Configuration
```env
# OpenAI API key
OPENAI_API_KEY="sk-..."

# OpenAI model to use
OPENAI_MODEL="gpt-4-turbo-preview"

# Max tokens for AI responses
OPENAI_MAX_TOKENS=2000
```

#### Payment Processing (Stripe)
```env
# Stripe secret key
STRIPE_SECRET_KEY="sk_test_..."

# Stripe publishable key
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe webhook secret
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### File Storage (AWS S3)
```env
# AWS credentials
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"

# S3 bucket name
AWS_S3_BUCKET="core-zodiac-uploads"

# CloudFront distribution (optional)
AWS_CLOUDFRONT_URL="https://d123456.cloudfront.net"
```

#### Email Service
```env
# Email service provider (sendgrid, mailgun, ses)
EMAIL_SERVICE="sendgrid"

# API key for email service
EMAIL_API_KEY="SG...."

# From email address
EMAIL_FROM="noreply@core-zodiac.com"

# From name
EMAIL_FROM_NAME="Core-Zodiac"
```

#### Frontend URL
```env
# Frontend application URL
FRONTEND_URL="http://localhost:3000"

# CORS allowed origins (comma-separated)
CORS_ORIGINS="http://localhost:3000,https://yourdomain.com"
```

#### Rate Limiting
```env
# Requests per minute per IP
RATE_LIMIT_PER_MINUTE=100

# Requests per hour per user
RATE_LIMIT_PER_HOUR=1000
```

#### Logging
```env
# Log level (error, warn, info, debug)
LOG_LEVEL="info"

# Log to file (true/false)
LOG_TO_FILE=false

# Log file path
LOG_FILE_PATH="./logs/app.log"
```

### Frontend Configuration

Create a `.env.local` file in the `frontend/` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# WebSocket URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Stripe publishable key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google Analytics ID (optional)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Enable analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# App name
NEXT_PUBLIC_APP_NAME="Core-Zodiac"

# Support email
NEXT_PUBLIC_SUPPORT_EMAIL=support@core-zodiac.com
```

## Docker Configuration

### Development with Docker Compose

The `docker-compose.yml` file is configured for development. Key services:

#### Frontend Service
- Port: 3000
- Hot reload enabled
- Volume mounting for live code changes

#### Backend Service
- Port: 4000
- Hot reload enabled
- Connected to PostgreSQL and Redis

#### PostgreSQL Service
- Port: 5432
- Data persisted in named volume
- Default credentials (change in production)

#### Redis Service
- Port: 6379
- Data persisted in named volume

### Production Docker Configuration

Create a `docker-compose.prod.yml` file:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    environment:
      - NODE_ENV=production
    ports:
      - "3000:3000"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      - NODE_ENV=production
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Application Configuration

### Multi-Tenant Settings

Configure tenant-specific settings in the database:

```typescript
// Example tenant settings structure
{
  "branding": {
    "logo": "https://...",
    "primaryColor": "#0ea5e9",
    "secondaryColor": "#3b82f6"
  },
  "features": {
    "aiGeneration": true,
    "chat": true,
    "shop": true,
    "adCampaigns": true
  },
  "limits": {
    "maxUsers": 100,
    "maxProducts": 1000,
    "maxLandingPages": 50
  },
  "integrations": {
    "stripe": {
      "enabled": true,
      "accountId": "acct_..."
    }
  }
}
```

### User Role Permissions

Default permissions by role:

```typescript
const rolePermissions = {
  SUPER_ADMIN: ['*'], // All permissions
  ADMIN: [
    'users.read',
    'users.create',
    'users.update',
    'users.delete',
    'products.*',
    'landingPages.*',
    'orders.*',
  ],
  VENDOR: [
    'products.read',
    'products.create',
    'products.update',
    'orders.read',
  ],
  AGENT: [
    'chat.*',
    'customers.read',
    'orders.read',
  ],
  CUSTOMER: [
    'products.read',
    'orders.create',
    'orders.read',
    'chat.create',
  ],
};
```

## Feature Flags

Enable/disable features via environment variables:

```env
# Feature flags
FEATURE_AI_GENERATION=true
FEATURE_CHAT=true
FEATURE_SHOP=true
FEATURE_AD_CAMPAIGNS=true
FEATURE_MULTI_TENANT=true
FEATURE_PWA=true
```

## Localization

Supported languages configuration in `frontend/next-i18next.config.js`:

```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de'],
  },
  localePath: './public/locales',
};
```

## Performance Configuration

### Database Connection Pool

```env
# PostgreSQL connection pool
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=30000
```

### Caching

```env
# Cache TTL in seconds
CACHE_TTL_DEFAULT=3600
CACHE_TTL_SHORT=300
CACHE_TTL_LONG=86400
```

### Rate Limiting

```env
# Rate limiting windows
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## Security Configuration

### CORS

```env
# CORS configuration
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
```

### Headers

Security headers are configured in the backend using Helmet.js:

```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## Monitoring Configuration

### Application Monitoring

```env
# Monitoring
ENABLE_MONITORING=true
MONITORING_SERVICE=datadog
MONITORING_API_KEY=...
```

### Logging

```env
# Log aggregation
LOG_AGGREGATION_SERVICE=loggly
LOG_AGGREGATION_TOKEN=...
```

## Backup Configuration

```env
# Automatic backups
BACKUP_ENABLED=true
BACKUP_SCHEDULE=0 2 * * *  # Daily at 2 AM
BACKUP_RETENTION_DAYS=30
BACKUP_STORAGE=s3
```

## Troubleshooting

### Common Configuration Issues

1. **Database connection fails**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify credentials

2. **Redis connection fails**
   - Check REDIS_URL
   - Ensure Redis is running
   - Verify password if configured

3. **JWT errors**
   - Ensure JWT_SECRET is set
   - Check token expiration settings

4. **CORS errors**
   - Verify FRONTEND_URL matches actual URL
   - Check CORS_ORIGINS includes frontend URL

5. **File upload fails**
   - Check AWS credentials
   - Verify S3 bucket exists and has correct permissions

## Production Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET
- [ ] Configure SSL/TLS
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Set up error tracking
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up CDN for static assets
- [ ] Enable logging
- [ ] Configure email service
- [ ] Set up payment webhooks
- [ ] Test disaster recovery plan
