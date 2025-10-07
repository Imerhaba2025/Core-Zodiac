import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import landingPageRoutes from './routes/landingPage.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import chatRoutes from './routes/chat.routes';
import adCampaignRoutes from './routes/adCampaign.routes';
import aiRoutes from './routes/ai.routes';
import tenantRoutes from './routes/tenant.routes';

import { errorHandler } from './middleware/errorHandler';
import { setupChatSocket } from './services/chat.service';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ad-campaigns', adCampaignRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/tenants', tenantRoutes);

// Socket.io for real-time chat
setupChatSocket(io);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
});

export { app, io };
