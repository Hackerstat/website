import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { HTTPCode, MEDIUM } from '../../../utils/constants';

/**
 * @name getUsername
 * @description The function retrieves a user's Medium username.
 * @author @LouisIV
 * @authentication user: auth0 token
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const mediumUserName = await getIntegrationUserName(req, res, MEDIUM);
      res.status(HTTPCode.OK).json({ username: mediumUserName });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Bad Header');
    }
  }
});
