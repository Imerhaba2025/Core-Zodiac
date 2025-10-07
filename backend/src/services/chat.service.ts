import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { generateChatResponse } from './ai.service';

const prisma = new PrismaClient();

export const setupChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-session', async (sessionId: string) => {
      socket.join(sessionId);
      console.log(`Socket ${socket.id} joined session ${sessionId}`);
    });

    socket.on('send-message', async (data: {
      sessionId: string;
      content: string;
      sender: string;
    }) => {
      try {
        // Save user message
        const userMessage = await prisma.chatMessage.create({
          data: {
            sessionId: data.sessionId,
            content: data.content,
            sender: data.sender,
            isBot: false,
          },
        });

        // Emit user message to all clients in the session
        io.to(data.sessionId).emit('new-message', userMessage);

        // Generate AI response
        const aiResponse = await generateChatResponse(data.content);

        // Save AI response
        const botMessage = await prisma.chatMessage.create({
          data: {
            sessionId: data.sessionId,
            content: aiResponse,
            sender: 'AI Assistant',
            isBot: true,
          },
        });

        // Emit AI response
        io.to(data.sessionId).emit('new-message', botMessage);

        // Update session
        await prisma.chatSession.update({
          where: { id: data.sessionId },
          data: { updatedAt: new Date() },
        });
      } catch (error) {
        console.error('Error handling chat message:', error);
        socket.emit('error', { message: 'Failed to process message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
