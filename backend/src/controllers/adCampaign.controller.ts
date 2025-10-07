import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createAdCampaign = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, content, platform, budget, startDate, endDate } = req.body;

    const campaign = await prisma.adCampaign.create({
      data: {
        name,
        description,
        content,
        platform,
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        userId: req.user!.id,
        tenantId: req.user!.tenantId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { campaign },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdCampaigns = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const where: any = {
      userId: req.user!.id,
    };
    if (status) where.status = status;

    const campaigns = await prisma.adCampaign.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.adCampaign.count({ where });

    res.json({
      status: 'success',
      data: { campaigns, pagination: { page: Number(page), limit: Number(limit), total } },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdCampaign = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const campaign = await prisma.adCampaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new AppError('Ad campaign not found', 404);
    }

    res.json({
      status: 'success',
      data: { campaign },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdCampaign = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, content, platform, budget, status, startDate, endDate, analytics } = req.body;

    const campaign = await prisma.adCampaign.update({
      where: { id },
      data: {
        name,
        description,
        content,
        platform,
        budget: budget ? parseFloat(budget) : undefined,
        status,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        analytics,
      },
    });

    res.json({
      status: 'success',
      data: { campaign },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdCampaign = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.adCampaign.delete({ where: { id } });

    res.json({
      status: 'success',
      message: 'Ad campaign deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
