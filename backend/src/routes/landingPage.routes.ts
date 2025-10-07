import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createLandingPage,
  getLandingPages,
  getLandingPage,
  updateLandingPage,
  deleteLandingPage,
  publishLandingPage,
} from '../controllers/landingPage.controller';

const router = Router();

router.use(authenticate);

router.post('/', createLandingPage);
router.get('/', getLandingPages);
router.get('/:id', getLandingPage);
router.put('/:id', updateLandingPage);
router.delete('/:id', deleteLandingPage);
router.post('/:id/publish', publishLandingPage);

export default router;
