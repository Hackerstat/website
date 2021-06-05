import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  issuerBaseURL: process.env.domain,
  clientID: process.env.clientId,
  clientSecret: process.env.clientSecret,
  authorizationParams: {
    scope: 'openid profile username',
  },
  routes: {
    callback: process.env.redirectUri,
    postLogoutRedirect: process.env.postLogoutRedirectUri,
  },
  secret: process.env.cookieSecret,
  session: {
    rollingDuration: 60 * 60 * 8,
  },
  httpTimeout: 2500,
  clockTolerance: 10000,
});
