# Deployment Guide

## Prerequisites

- Docker and Docker Compose (recommended)
- OR Node.js 18+, PostgreSQL 15+, Redis 7+

## Option 1: Docker Deployment (Recommended)

### 1. Configure Environment Variables

Create `.env` files for both frontend and backend:

**backend/.env**
```bash
PORT=4000
NODE_ENV=production
DATABASE_URL="postgresql://postgres:postgres@db:5432/core_zodiac"
REDIS_URL="redis://redis:6379"
JWT_SECRET=your-production-secret-change-this
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your-openai-api-key
STRIPE_SECRET_KEY=your-stripe-secret
FRONTEND_URL=https://your-domain.com
```

**frontend/.env.local**
```bash
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_SOCKET_URL=https://api.your-domain.com
```

### 2. Build and Start Services

```bash
docker-compose up -d
```

### 3. Run Database Migrations

```bash
docker-compose exec backend npx prisma migrate deploy
```

### 4. Verify Services

```bash
docker-compose ps
```

All services should be running:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Option 2: Manual Deployment

### Backend Deployment

1. **Set up PostgreSQL database**
```bash
psql -U postgres
CREATE DATABASE core_zodiac;
\q
```

2. **Install dependencies**
```bash
cd backend
npm install --production
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with production values
```

4. **Run migrations**
```bash
npx prisma migrate deploy
npx prisma generate
```

5. **Build**
```bash
npm run build
```

6. **Start with PM2**
```bash
npm install -g pm2
pm2 start dist/index.js --name core-zodiac-api
pm2 save
pm2 startup
```

### Frontend Deployment

1. **Install dependencies**
```bash
cd frontend
npm install --production
```

2. **Configure environment**
```bash
cp .env.local.example .env.local
# Edit .env.local with production values
```

3. **Build**
```bash
npm run build
```

4. **Start with PM2**
```bash
pm2 start npm --name core-zodiac-frontend -- start
pm2 save
```

## Nginx Configuration

Create `/etc/nginx/sites-available/core-zodiac`:

```nginx
# Frontend
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/core-zodiac /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Configuration with Let's Encrypt

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

## Monitoring

### PM2 Monitoring

```bash
pm2 monit
pm2 logs
```

### Docker Monitoring

```bash
docker-compose logs -f
docker stats
```

## Backup

### Database Backup

```bash
# Docker
docker-compose exec db pg_dump -U postgres core_zodiac > backup.sql

# Manual
pg_dump -U postgres core_zodiac > backup.sql
```

### Restore Database

```bash
# Docker
docker-compose exec -T db psql -U postgres core_zodiac < backup.sql

# Manual
psql -U postgres core_zodiac < backup.sql
```

## Scaling

### Horizontal Scaling

Use Docker Swarm or Kubernetes for horizontal scaling:

```bash
docker-compose up -d --scale backend=3
```

### Load Balancing

Configure Nginx as a load balancer for multiple backend instances.

## Performance Optimization

1. Enable Redis caching
2. Configure CDN for static assets
3. Enable gzip compression in Nginx
4. Optimize database queries
5. Use connection pooling

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor logs
