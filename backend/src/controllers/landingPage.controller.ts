import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, slug, description, content, template, metadata, seo } = req.body;

    const landingPage = await prisma.landingPage.create({
      data: {
        title,
        slug,
        description,
        content,
        template,
        metadata,
        seo,
        userId: req.user!.id,
        tenantId: req.user!.tenantId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { landingPage },
    });
  } catch (error) {
    next(error);
  }
};

export const getLandingPages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const where: any = {
      userId: req.user!.id,
    };
    if (status) where.status = status;

    const landingPages = await prisma.landingPage.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.landingPage.count({ where });

    res.json({
      status: 'success',
      data: { landingPages, pagination: { page: Number(page), limit: Number(limit), total } },
    });
  } catch (error) {
    next(error);
  }
};

export const getLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const landingPage = await prisma.landingPage.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!landingPage) {
      throw new AppError('Landing page not found', 404);
    }

    res.json({
      status: 'success',
      data: { landingPage },
    });
  } catch (error) {
    next(error);
  }
};

export const updateLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, content, template, metadata, seo, status } = req.body;

    const landingPage = await prisma.landingPage.update({
      where: { id },
      data: { title, description, content, template, metadata, seo, status },
    });

    res.json({
      status: 'success',
      data: { landingPage },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.landingPage.delete({ where: { id } });

    res.json({
      status: 'success',
      message: 'Landing page deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const publishLandingPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const landingPage = await prisma.landingPage.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    res.json({
      status: 'success',
      data: { landingPage },
    });
  } catch (error) {
    next(error);
  }
};
