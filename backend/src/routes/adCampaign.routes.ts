import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createAdCampaign,
  getAdCampaigns,
  getAdCampaign,
  updateAdCampaign,
  deleteAdCampaign,
} from '../controllers/adCampaign.controller';

const router = Router();

router.use(authenticate);

router.post('/', createAdCampaign);
router.get('/', getAdCampaigns);
router.get('/:id', getAdCampaign);
router.put('/:id', updateAdCampaign);
router.delete('/:id', deleteAdCampaign);

export default router;
