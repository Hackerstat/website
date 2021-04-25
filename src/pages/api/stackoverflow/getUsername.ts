import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

const INTEGRATION_NAME_STACKOVERFLOW = 'stackoverflow';
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const stackoverflowUserName = await getIntegrationUserName(req, INTEGRATION_NAME_STACKOVERFLOW);
      res.status(HTTPCode.OK).json({ username: stackoverflowUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Bad Header');
    }
  }
});
