import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';

export function verifyWebhookSignature(req: Request, res: Response, next: NextFunction) {
  const signature = req.header('x-hub-signature-256');
  const rawBody = (req as Request & { rawBody?: string }).rawBody;
  if (!signature || !rawBody) return res.status(401).json({ message: 'Missing signature' });

  const expected = `sha256=${crypto.createHmac('sha256', env.meta.webhookSecret).update(rawBody).digest('hex')}`;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return res.status(401).json({ message: 'Invalid signature' });
  }
  return next();
}
