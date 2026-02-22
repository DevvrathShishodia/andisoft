import { Queue, Worker } from 'bullmq';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { decrypt } from '../utils/crypto';
import { sendInstagramDm } from '../services/meta.service';

export const dmQueue = new Queue('dm-delivery', { connection: redis });

new Worker(
  'dm-delivery',
  async (job) => {
    const account = await prisma.instagramAccount.findUnique({
      where: { id: job.data.instagramAccountId },
      include: { tokens: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });
    if (!account?.tokens[0]) throw new Error('No token configured');

    const recentCount = await prisma.job.count({
      where: {
        instagramAccountId: account.id,
        type: 'send-dm',
        status: 'DONE',
        createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
      },
    });

    if (recentCount >= 200) throw new Error('Rate limit 200 DMs/hour reached');

    // window checks should be based on last inbound timestamp from recipient.
    await sendInstagramDm(account.igUserId, job.data.recipientId, job.data.message, decrypt(account.tokens[0].encryptedAccess));

    await prisma.job.upsert({
      where: { bullJobId: String(job.id) },
      create: {
        workspaceId: job.data.workspaceId,
        instagramAccountId: account.id,
        bullJobId: String(job.id),
        type: 'send-dm',
        status: 'DONE',
        payload: job.data,
      },
      update: { status: 'DONE' },
    });
  },
  { connection: redis },
);
