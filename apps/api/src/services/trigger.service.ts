import { Trigger } from '@prisma/client';
import { prisma } from '../config/prisma';

export async function resolveMatchingTrigger(params: {
  instagramAccountId: string;
  message: string;
  postId?: string;
  storyId?: string;
}) {
  const normalized = params.message.toLowerCase();
  const triggers = await prisma.trigger.findMany({
    where: { instagramAccountId: params.instagramAccountId, enabled: true },
    include: { triggerSteps: { orderBy: { stepOrder: 'asc' } } },
    orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
  });

  return triggers.find((trigger) => matchTrigger(trigger, normalized, params.postId, params.storyId));
}

function matchTrigger(trigger: Trigger, message: string, postId?: string, storyId?: string) {
  const keywordMatch = message.includes(trigger.keyword.toLowerCase());
  if (!keywordMatch) return false;
  if (trigger.scope === 'GLOBAL') return true;
  if (trigger.scope === 'POST' && trigger.sourceRef === postId) return true;
  if (trigger.scope === 'STORY' && trigger.sourceRef === storyId) return true;
  return false;
}
