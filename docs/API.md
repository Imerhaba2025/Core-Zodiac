# API Documentation

## Overview

The Core-Zodiac API is a RESTful API that provides endpoints for managing landing pages, products, orders, chat sessions, and AI-powered content generation.

## Base URL

```
http://localhost:4000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "jwt-token"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Landing Pages

#### Create Landing Page
```http
POST /api/landing-pages
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Awesome Product",
  "slug": "my-awesome-product",
  "description": "A brief description",
  "content": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Best product ever"
    },
    "features": []
  },
  "template": "modern",
  "seo": {
    "title": "My Product",
    "description": "SEO description",
    "keywords": ["product", "awesome"]
  }
}
```

#### Get Landing Pages
```http
GET /api/landing-pages?page=1&limit=10&status=PUBLISHED
Authorization: Bearer <token>
```

### Products

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "price": 99.99,
  "inventory": 100,
  "category": "electronics",
  "images": ["url1", "url2"],
  "tags": ["tag1", "tag2"]
}
```

### AI Generation

#### Generate Landing Page
```http
POST /api/ai/generate/landing-page
Authorization: Bearer <token>
Content-Type: application/json

{
  "businessName": "TechCorp",
  "industry": "Technology",
  "targetAudience": "Small businesses",
  "keyFeatures": "Cloud storage, collaboration tools",
  "tone": "professional"
}
```

#### Generate Ad Content
```http
POST /api/ai/generate/ad-content
Authorization: Bearer <token>
Content-Type: application/json

{
  "platform": "Google Ads",
  "product": "Cloud Storage Service",
  "targetAudience": "Small businesses",
  "goal": "Lead generation",
  "budget": 1000
}
```

## Error Responses

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

Common HTTP status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited to prevent abuse. Current limits:
- 100 requests per minute per IP
- 1000 requests per hour per user

## WebSocket Events

### Chat

Connect to WebSocket server at `http://localhost:4000`

#### Join Session
```javascript
socket.emit('join-session', sessionId);
```

#### Send Message
```javascript
socket.emit('send-message', {
  sessionId: 'session-id',
  content: 'Hello!',
  sender: 'user-name'
});
```

#### Receive Message
```javascript
socket.on('new-message', (message) => {
  console.log(message);
});
```
