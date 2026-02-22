import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { generateShortCode, logClickEvent } from '../services/url-shortener.service';

export async function createShortLink(req: Request, res: Response) {
  const { workspaceId } = res.locals.auth;
  const { accountId, triggerId, destinationUrl } = req.body;
  const shortCode = generateShortCode();

  await prisma.job.create({
    data: {
      workspaceId,
      instagramAccountId: accountId,
      bullJobId: `short-link:${shortCode}`,
      type: 'short-link',
      status: 'DONE',
      payload: { triggerId, destinationUrl, shortCode },
    },
  });

  res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/r/${shortCode}` });
}

export async function redirectShortLink(req: Request, res: Response) {
  const { shortCode } = req.params;
  const link = await prisma.job.findUnique({ where: { bullJobId: `short-link:${shortCode}` } });
  if (!link) return res.status(404).send('Not found');
  const payload = link.payload as any;
  await logClickEvent({
    workspaceId: link.workspaceId,
    accountId: link.instagramAccountId,
    triggerId: payload.triggerId,
    shortCode,
    destinationUrl: payload.destinationUrl,
    ip: req.ip,
    userAgent: req.get('user-agent') ?? 'unknown',
  });
  return res.redirect(payload.destinationUrl);
}
