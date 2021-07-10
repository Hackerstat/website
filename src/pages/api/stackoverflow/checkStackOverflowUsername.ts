import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../utils/constants';
import { checkStackOverflowUsernameValidator } from '../../../utils/validation';
import { fetchStackOverflowInfo } from '../../../utils/thrdAPIs';
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
  if (req.method === 'GET') {
    try {
      const { username } = await checkStackOverflowUsernameValidator(req.query);
      const stackOverflowData = await fetchStackOverflowInfo(username);
      res.status(HTTPCode.OK).json(stackOverflowData);
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('FAIL');
    }
  }
});
