import axios from 'axios';
import { env } from '../config/env';

const graph = axios.create({ baseURL: 'https://graph.facebook.com/v21.0' });

export async function exchangeCodeForShortToken(code: string) {
  const { data } = await graph.get('/oauth/access_token', {
    params: {
      client_id: env.meta.appId,
      client_secret: env.meta.appSecret,
      redirect_uri: env.meta.redirectUri,
      code,
    },
  });
  return data as { access_token: string; token_type: string; expires_in: number };
}

export async function exchangeForLongLivedToken(shortToken: string) {
  const { data } = await graph.get('/oauth/access_token', {
    params: {
      grant_type: 'fb_exchange_token',
      client_id: env.meta.appId,
      client_secret: env.meta.appSecret,
      fb_exchange_token: shortToken,
    },
  });
  return data as { access_token: string; token_type: string; expires_in: number };
}

export async function fetchInstagramAccounts(accessToken: string) {
  const { data } = await graph.get('/me/accounts', {
    params: {
      fields: 'instagram_business_account{id,username}',
      access_token: accessToken,
    },
  });
  return data.data as Array<{ instagram_business_account?: { id: string; username: string } }>;
}

export async function sendInstagramDm(igUserId: string, recipientId: string, message: string, accessToken: string) {
  return graph.post(
    `/${igUserId}/messages`,
    { recipient: { id: recipientId }, message: { text: message }, messaging_type: 'RESPONSE' },
    { params: { access_token: accessToken } },
  );
}
