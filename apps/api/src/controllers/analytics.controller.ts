import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function analyticsOverview(_req: Request, res: Response) {
  const { workspaceId } = res.locals.auth;
  const [clicks, activeTriggers, dmsSent, byDay, topTriggers] = await Promise.all([
    prisma.clickEvent.count({ where: { workspaceId } }),
    prisma.trigger.count({ where: { workspaceId, enabled: true } }),
    prisma.job.count({ where: { workspaceId, type: 'send-dm', status: 'DONE' } }),
    prisma.analyticsAggregate.findMany({ where: { workspaceId }, orderBy: { dateBucket: 'asc' }, take: 30 }),
    prisma.trigger.findMany({
      where: { workspaceId },
      orderBy: { clickEvents: { _count: 'desc' } },
      take: 5,
      include: { _count: { select: { clickEvents: true } } },
    }),
  ]);

  res.json({
    totals: { clicks, activeTriggers, dmsSent },
    byDay,
    topTriggers: topTriggers.map((t) => ({ id: t.id, name: t.name, clicks: t._count.clickEvents })),
  });
}
