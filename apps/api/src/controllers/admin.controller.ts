import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { dmQueue } from '../queues/dm.queue';

export async function adminOverview(_req: Request, res: Response) {
  const [users, accounts, suspended, waiting, failedWebhooks] = await Promise.all([
    prisma.user.count(),
    prisma.instagramAccount.count(),
    prisma.user.count({ where: { suspendedAt: { not: null } } }),
    dmQueue.getWaitingCount(),
    prisma.webhookLog.count({ where: { signatureValid: false } }),
  ]);

  res.json({ users, accounts, suspended, queueWaiting: waiting, webhookErrors: failedWebhooks, system: 'healthy' });
}

export async function suspendUser(req: Request, res: Response) {
  const { userId } = req.params;
  await prisma.user.update({ where: { id: userId }, data: { suspendedAt: new Date() } });
  res.json({ suspended: true });
}
