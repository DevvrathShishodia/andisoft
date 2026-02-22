import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { logger } from './config/logger';
import { apiRateLimiter } from './middlewares/rate-limit.middleware';
import { csrfCookie, csrfProtection } from './middlewares/csrf.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';
import { redirectShortLink } from './controllers/link.controller';

export const app = express();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as express.Request & { rawBody?: string }).rawBody = buf.toString();
    },
  }),
);
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(apiRateLimiter);
app.use(csrfCookie);
app.use(csrfProtection);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/r/:shortCode', redirectShortLink);
app.use('/api', router);
app.use(errorMiddleware);
