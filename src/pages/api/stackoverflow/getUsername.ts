import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode, STACKOVERFLOW } from '../../../utils/constants';

/**
 * @name getUsername
 * @description It is the function that will retrieve the HackerStat User's StackOverflow username from their HackerStat profile.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const stackoverflowUserName = await getIntegrationUserName(req, res, STACKOVERFLOW);
      res.status(HTTPCode.OK).json({ username: stackoverflowUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Bad Header');
    }
  }
});
