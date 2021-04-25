import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

const INTEGRATION_NAME_NPM = 'npm';
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const npmUserName = await getIntegrationUserName(req, INTEGRATION_NAME_NPM);
      res.status(HTTPCode.OK).json({ username: npmUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Header');
    }
  }
});
