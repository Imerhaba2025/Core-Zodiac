import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const createChatSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, guestId } = req.body;

    const session = await prisma.chatSession.create({
      data: {
        userId,
        guestId,
        status: 'ACTIVE',
      },
    });

    res.status(201).json({
      status: 'success',
      data: { session },
    });
  } catch (error) {
    next(error);
  }
};

export const getChatSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, status } = req.query;

    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const sessions = await prisma.chatSession.findMany({
      where,
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { sessions },
    });
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'asc' },
    });

    res.json({
      status: 'success',
      data: { messages },
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const { content, sender, isBot } = req.body;

    const message = await prisma.chatMessage.create({
      data: {
        sessionId,
        content,
        sender,
        isBot: isBot || false,
      },
    });

    // Update session updatedAt
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });

    res.status(201).json({
      status: 'success',
      data: { message },
    });
  } catch (error) {
    next(error);
  }
};
