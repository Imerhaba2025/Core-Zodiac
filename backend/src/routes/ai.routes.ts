import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  generateLandingPage,
  generateAdContent,
  generateProductDescription,
  chatWithAI,
} from '../controllers/ai.controller';

const router = Router();

router.use(authenticate);

router.post('/generate/landing-page', generateLandingPage);
router.post('/generate/ad-content', generateAdContent);
router.post('/generate/product-description', generateProductDescription);
router.post('/chat', chatWithAI);

export default router;
