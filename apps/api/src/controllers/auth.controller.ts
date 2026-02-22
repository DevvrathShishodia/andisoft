import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { signToken } from '../utils/jwt';

const schema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(2) });

export async function register(req: Request, res: Response) {
  const payload = schema.parse(req.body);
  const hash = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      name: payload.name,
      passwordHash: hash,
      workspaces: { create: { name: `${payload.name}'s Workspace` } },
    },
    include: { workspaces: true },
  });

  const workspace = user.workspaces[0];
  await prisma.role.create({ data: { userId: user.id, workspaceId: workspace.id, role: 'OWNER' } });

  return res.json({ token: signToken({ userId: user.id, workspaceId: workspace.id, role: 'OWNER' }) });
}

export async function login(req: Request, res: Response) {
  const payload = schema.pick({ email: true, password: true }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const role = await prisma.role.findFirst({ where: { userId: user.id }, orderBy: { role: 'asc' } });
  if (!role) return res.status(400).json({ message: 'No workspace role found' });
  return res.json({ token: signToken({ userId: user.id, workspaceId: role.workspaceId, role: role.role }) });
}
