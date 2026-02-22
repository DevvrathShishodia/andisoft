import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { resolveMatchingTrigger } from '../services/trigger.service';
import { scheduleTriggerSteps } from '../services/scheduler.service';

export async function verifyWebhook(req: Request, res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === env.meta.verifyToken) return res.status(200).send(challenge);
  return res.status(403).send('Forbidden');
}

export async function handleWebhook(req: Request, res: Response) {
  const payload = req.body as any;
  const entry = payload?.entry?.[0];
  const igUserId = entry?.id;

  const account = await prisma.instagramAccount.findUnique({ where: { igUserId } });
  if (!account) return res.status(202).json({ accepted: true });

  await prisma.webhookLog.create({
    data: {
      workspaceId: account.workspaceId,
      instagramAccountId: account.id,
      topic: payload.object,
      payload,
      signatureValid: true,
    },
  });

  const incoming = entry?.messaging?.[0];
  if (incoming?.message?.text) {
    const trigger = await resolveMatchingTrigger({
      instagramAccountId: account.id,
      message: incoming.message.text,
      postId: incoming?.postback?.mid,
      storyId: incoming?.story?.id,
    });

    if (trigger) {
      await scheduleTriggerSteps({
        workspaceId: account.workspaceId,
        instagramAccountId: account.id,
        recipientId: incoming.sender.id,
        triggerId: trigger.id,
        steps: trigger.triggerSteps,
      });
    }
  }

  return res.status(200).json({ processed: true });
}
