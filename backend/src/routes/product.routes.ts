import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.use(authenticate);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
