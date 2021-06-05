import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  baseURL: process.env.VERCEL_URL || 'http://localhost:3000',
  issuerBaseURL: 'https://slack-clone-auth0.auth0.com',
  clientID: process.env.clientId,
  clientSecret: process.env.clientSecret,
  authorizationParams: {
    scope: 'openid profile username',
  },
  routes: {
    callback: '/api/callback',
    postLogoutRedirect: '/',
  },
  secret: process.env.cookieSecret,
  session: {
    rollingDuration: 60 * 60 * 8,
  },
  httpTimeout: 2500,
  clockTolerance: 10000,
});
