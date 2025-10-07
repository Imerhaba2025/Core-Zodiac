import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createTenant,
  getTenants,
  getTenant,
  updateTenant,
  deleteTenant,
} from '../controllers/tenant.controller';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.SUPER_ADMIN));

router.post('/', createTenant);
router.get('/', getTenants);
router.get('/:id', getTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;
