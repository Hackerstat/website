import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

const INTEGRATION_NAME_MEDIUM = 'medium';
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const mediumUserName = await getIntegrationUserName(req, res, INTEGRATION_NAME_MEDIUM);
      res.status(HTTPCode.OK).json({ username: mediumUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Bad Header');
    }
  }
});
