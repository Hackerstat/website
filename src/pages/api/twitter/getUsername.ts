import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode, TWITTER } from '../../../utils/constants';

/**
 * @name getUsername
 * @description It is a function that retrieves the HackerStat user's Twitter username.
 * @author @Cgunter1 @LouisIV
 * @authentication user: auth0 token
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const twitterUserName = await getIntegrationUserName(req, res, TWITTER);
      res.status(HTTPCode.OK).json({ username: twitterUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Header');
    }
  }
});
