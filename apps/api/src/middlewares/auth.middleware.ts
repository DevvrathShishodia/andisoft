import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyToken(token);
    res.locals.auth = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function roleGuard(roles: string[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.auth.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
