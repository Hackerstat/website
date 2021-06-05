import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

const INTEGRATION_NAME_TWITTER = 'twitter';
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const twitterUserName = await getIntegrationUserName(req, res, INTEGRATION_NAME_TWITTER);
      res.status(HTTPCode.OK).json({ username: twitterUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Header');
    }
  }
});
