import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, StatusTypes, MEDIUM, HttpCodes } from '../../../utils';

/**
 * @name getUsername
 * @description The function retrieves a user's Medium username.
 * @author @LouisIV
 * @authentication user: auth0 token
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const mediumUserName = await getIntegrationUserName(req, res, MEDIUM);
      handleRes({ res, status: StatusTypes.OK, jsonData: { username: mediumUserName } });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR, message: 'Bad Header' });
    }
  }
});
