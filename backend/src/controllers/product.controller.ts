import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description, price, images, inventory, category, tags } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        images,
        inventory: parseInt(inventory),
        category,
        tags,
        userId: req.user!.id,
        tenantId: req.user!.tenantId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const where: any = { isActive: true };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.product.count({ where });

    res.json({
      status: 'success',
      data: { products, pagination: { page: Number(page), limit: Number(limit), total } },
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price, images, inventory, category, tags, isActive } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        images,
        inventory: inventory ? parseInt(inventory) : undefined,
        category,
        tags,
        isActive,
      },
    });

    res.json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
