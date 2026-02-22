import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { encrypt } from '../utils/crypto';
import { exchangeCodeForShortToken, exchangeForLongLivedToken, fetchInstagramAccounts } from '../services/meta.service';

export async function connectInstagram(req: Request, res: Response) {
  const { code } = req.body as { code: string };
  const { workspaceId } = res.locals.auth;

  const short = await exchangeCodeForShortToken(code);
  const long = await exchangeForLongLivedToken(short.access_token);
  const accounts = await fetchInstagramAccounts(long.access_token);

  const linked = await Promise.all(
    accounts
      .filter((a) => a.instagram_business_account)
      .map(async (entry) => {
        const account = await prisma.instagramAccount.upsert({
          where: { igUserId: entry.instagram_business_account!.id },
          update: { username: entry.instagram_business_account!.username, workspaceId },
          create: {
            workspaceId,
            igUserId: entry.instagram_business_account!.id,
            username: entry.instagram_business_account!.username,
          },
        });

        await prisma.token.create({
          data: {
            instagramAccountId: account.id,
            encryptedAccess: encrypt(long.access_token),
            expiresAt: new Date(Date.now() + long.expires_in * 1000),
          },
        });

        return account;
      }),
  );

  res.json({ linkedCount: linked.length, accounts: linked });
}
