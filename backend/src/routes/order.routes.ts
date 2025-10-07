import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);

export default router;
