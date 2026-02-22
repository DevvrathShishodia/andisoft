import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: 'Internal server error' });
}
