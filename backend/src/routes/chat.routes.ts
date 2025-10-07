import { Router } from 'express';
import {
  createChatSession,
  getChatSessions,
  getChatMessages,
  sendMessage,
} from '../controllers/chat.controller';

const router = Router();

router.post('/sessions', createChatSession);
router.get('/sessions', getChatSessions);
router.get('/sessions/:sessionId/messages', getChatMessages);
router.post('/sessions/:sessionId/messages', sendMessage);

export default router;
