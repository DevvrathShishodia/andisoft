import { TriggerStep } from '@prisma/client';
import { dmQueue } from '../queues/dm.queue';

export async function scheduleTriggerSteps(payload: {
  workspaceId: string;
  instagramAccountId: string;
  recipientId: string;
  triggerId: string;
  steps: TriggerStep[];
}) {
  for (const step of payload.steps) {
    const delay = ((step.delayDays * 24) + step.delayHours) * 60 * 60 * 1000;
    await dmQueue.add(
      'send-dm',
      {
        workspaceId: payload.workspaceId,
        instagramAccountId: payload.instagramAccountId,
        recipientId: payload.recipientId,
        triggerId: payload.triggerId,
        message: step.message,
        stepOrder: step.stepOrder,
      },
      {
        delay,
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
      },
    );
  }
}
