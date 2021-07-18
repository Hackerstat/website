import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, TWITTER } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name getUsername
 * @description It is a function that retrieves the HackerStat user's Twitter username.
 * @author @Cgunter1 @LouisIV
 * @authentication user: auth0 token
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const twitterUserName = await getIntegrationUserName(req, res, TWITTER);
      handleRes({ res, status: StatusTypes.OK, jsonData: { username: twitterUserName } });
    } catch ({ message }) {
      console.error(message);
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
    }
  }
});
