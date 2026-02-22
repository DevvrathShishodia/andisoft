import crypto from 'crypto';
import { prisma } from '../config/prisma';
import { hashIp } from '../utils/crypto';

export function generateShortCode() {
  return crypto.randomBytes(4).toString('base64url');
}

export async function logClickEvent(input: {
  workspaceId: string;
  accountId: string;
  triggerId: string;
  shortCode: string;
  destinationUrl: string;
  ip: string;
  userAgent: string;
}) {
  await prisma.clickEvent.create({
    data: {
      workspaceId: input.workspaceId,
      accountId: input.accountId,
      triggerId: input.triggerId,
      shortCode: input.shortCode,
      destinationUrl: input.destinationUrl,
      ipHash: hashIp(input.ip),
      userAgent: input.userAgent,
    },
  });
}
