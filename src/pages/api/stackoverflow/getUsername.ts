import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationUserName } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, STACKOVERFLOW } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name getUsername
 * @description It is the function that will retrieve the HackerStat User's StackOverflow username from their HackerStat profile.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const stackoverflowUserName = await getIntegrationUserName(req, res, STACKOVERFLOW);
      handleRes({ res, status: StatusTypes.OK, jsonData: { username: stackoverflowUserName } });
    } catch ({ message }) {
      console.error({ message });
      handleRes({ res, status: StatusTypes.SERVER_ERROR, message });
    }
  }
});
