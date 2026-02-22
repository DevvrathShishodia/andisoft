import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';

const stepSchema = z.object({ stepOrder: z.number().int().min(1), delayHours: z.number().min(0), delayDays: z.number().min(0), message: z.string().min(1) });
const triggerSchema = z.object({
  instagramAccountId: z.string(),
  name: z.string().min(2),
  keyword: z.string().min(1),
  scope: z.enum(['GLOBAL', 'POST', 'STORY']),
  sourceRef: z.string().optional(),
  template: z.string().min(1),
  priority: z.number().int().min(1).max(999),
  enabled: z.boolean().default(true),
  steps: z.array(stepSchema).min(1),
});

export async function createTrigger(req: Request, res: Response) {
  const data = triggerSchema.parse(req.body);
  const { workspaceId } = res.locals.auth;

  const trigger = await prisma.trigger.create({
    data: {
      workspaceId,
      instagramAccountId: data.instagramAccountId,
      name: data.name,
      keyword: data.keyword,
      scope: data.scope,
      sourceRef: data.sourceRef,
      template: data.template,
      priority: data.priority,
      enabled: data.enabled,
      triggerSteps: { create: data.steps },
    },
    include: { triggerSteps: true },
  });

  res.status(201).json(trigger);
}

export async function listTriggers(_req: Request, res: Response) {
  const { workspaceId } = res.locals.auth;
  const triggers = await prisma.trigger.findMany({ where: { workspaceId }, include: { triggerSteps: true } });
  res.json(triggers);
}
