import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

const INTEGRATION_NAME_MEDIUM = 'medium';
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const mediumUserName = await getIntegrationUserName(req, INTEGRATION_NAME_MEDIUM);
      res.status(200).json({ username: mediumUserName });
    } catch (e) {
      console.error(e);
      res.status(400).send('Bad Header');
    }
  }
});
