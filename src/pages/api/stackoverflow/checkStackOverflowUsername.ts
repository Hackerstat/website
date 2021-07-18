import { NextApiRequest, NextApiResponse } from 'next';
import {
  handleRes,
  HttpCodes,
  StatusTypes,
  checkStackOverflowUsernameValidator,
  fetchStackOverflowInfo,
} from '../../../utils';
import auth0 from '../../../utils/auth';

/**
 * body: {
 *  soID: 214saa23
 * }
 */
/**
 * @name checkStackOverflowUsername
 * @description This is the function that fetches stackOverflow info from a user's stackoverflow username.
 * @author @Cgunter1 @LouisIV
 * @authentication user: auth0 token
 * @argument {string} username It is the HackerStat user's StackOverflow username.
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const { username } = await checkStackOverflowUsernameValidator(req.query);
      const stackOverflowData = await fetchStackOverflowInfo(username);
      handleRes({ res, status: StatusTypes.OK, jsonData: stackOverflowData });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  }
});
