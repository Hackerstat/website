import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode, NPM } from '../../../utils/constants';

/**
 * @name getUserName
 * @description The function retrieves an authenticated user's NPM username.
 * @author @Cgunter1
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const npmUserName = await getIntegrationUserName(req, res, NPM);
      res.status(HTTPCode.OK).json({ username: npmUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Header');
    }
  }
});
