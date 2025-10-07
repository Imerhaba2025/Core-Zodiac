import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createTenant = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, slug, domain, description, subscriptionPlan } = req.body;

    const existingTenant = await prisma.tenant.findUnique({ where: { slug } });
    if (existingTenant) {
      throw new AppError('Tenant with this slug already exists', 400);
    }

    const tenant = await prisma.tenant.create({
      data: {
        name,
        slug,
        domain,
        description,
        subscriptionPlan,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { tenant },
    });
  } catch (error) {
    next(error);
  }
};

export const getTenants = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const tenants = await prisma.tenant.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.tenant.count({ where });

    res.json({
      status: 'success',
      data: { tenants, pagination: { page: Number(page), limit: Number(limit), total } },
    });
  } catch (error) {
    next(error);
  }
};

export const getTenant = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            landingPages: true,
            products: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new AppError('Tenant not found', 404);
    }

    res.json({
      status: 'success',
      data: { tenant },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTenant = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, domain, description, subscriptionStatus, subscriptionPlan, settings, isActive } = req.body;

    const tenant = await prisma.tenant.update({
      where: { id },
      data: {
        name,
        domain,
        description,
        subscriptionStatus,
        subscriptionPlan,
        settings,
        isActive,
      },
    });

    res.json({
      status: 'success',
      data: { tenant },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTenant = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.tenant.delete({ where: { id } });

    res.json({
      status: 'success',
      message: 'Tenant deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
