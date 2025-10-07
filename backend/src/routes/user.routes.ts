import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN), deleteUser);

export default router;
