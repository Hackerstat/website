import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, StatusTypes, NPM, HttpCodes } from '../../../utils';

/**
 * @name getUserName
 * @description The function retrieves an authenticated user's NPM username.
 * @author @Cgunter1
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const npmUserName = await getIntegrationUserName(req, res, NPM);
      handleRes({ res, status: StatusTypes.OK, jsonData: { username: npmUserName } });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message: 'Bad Header' });
    }
  }
});
