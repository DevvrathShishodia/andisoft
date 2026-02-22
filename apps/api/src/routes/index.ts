import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { connectInstagram } from '../controllers/oauth.controller';
import { handleWebhook, verifyWebhook } from '../controllers/webhook.controller';
import { createTrigger, listTriggers } from '../controllers/trigger.controller';
import { analyticsOverview } from '../controllers/analytics.controller';
import { adminOverview, suspendUser } from '../controllers/admin.controller';
import { createShortLink } from '../controllers/link.controller';
import { authMiddleware, roleGuard } from '../middlewares/auth.middleware';
import { verifyWebhookSignature } from '../middlewares/webhook.middleware';

export const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

router.post('/oauth/instagram', authMiddleware, connectInstagram);
router.get('/webhooks/meta', verifyWebhook);
router.post('/webhooks/meta', verifyWebhookSignature, handleWebhook);

router.get('/triggers', authMiddleware, listTriggers);
router.post('/triggers', authMiddleware, createTrigger);
router.get('/analytics/overview', authMiddleware, analyticsOverview);
router.post('/links/shorten', authMiddleware, createShortLink);

router.get('/admin/overview', authMiddleware, roleGuard(['OWNER', 'ADMIN']), adminOverview);
router.post('/admin/users/:userId/suspend', authMiddleware, roleGuard(['OWNER', 'ADMIN']), suspendUser);
