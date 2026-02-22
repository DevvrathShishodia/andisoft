import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

export function csrfCookie(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.csrf_token) {
    res.cookie('csrf_token', crypto.randomBytes(16).toString('hex'), {
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  next();
}

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const tokenFromCookie = req.cookies.csrf_token;
  const tokenFromHeader = req.header('x-csrf-token');
  if (!tokenFromCookie || !tokenFromHeader || tokenFromCookie !== tokenFromHeader) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  return next();
}
