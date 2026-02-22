import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiPort: Number(process.env.API_PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  jwtSecret: process.env.JWT_SECRET ?? 'unsafe-dev-secret',
  encryptionKey: process.env.ENCRYPTION_KEY ?? 'unsafe-unsafe-unsafe-unsafe-123456',
  meta: {
    appId: process.env.META_APP_ID ?? '',
    appSecret: process.env.META_APP_SECRET ?? '',
    redirectUri: process.env.META_REDIRECT_URI ?? '',
    verifyToken: process.env.META_VERIFY_TOKEN ?? '',
    webhookSecret: process.env.META_WEBHOOK_SECRET ?? '',
  },
};
