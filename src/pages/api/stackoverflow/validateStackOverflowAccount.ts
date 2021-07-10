import { NextApiRequest, NextApiResponse } from 'next';
import { mediumUserNameQueryValidator, HTTPCode } from '../../../utils';
import { getUsername } from '../../../utils/mongo';
import { validateStackOverflowAccountScrape } from '../../../utils/thrdAPIs';
import auth0 from '../../../utils/auth';

/**
 * @name validateStackOverflowAccount
 * @description The function validates if a user's StackOverflow account is their's by checking the StackOverflow user's profile bio for `http://hackerstat.io/{hackerStatUsername}`.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @param {string} username StackOverflow Account Username
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { username } = await mediumUserNameQueryValidator(req.query);
      const { username: hackerStatUsername } = await getUsername(req, res);
      const isValidated = await validateStackOverflowAccountScrape(username, hackerStatUsername || '');
      res.status(HTTPCode.OK).json({ validated: isValidated });
    } catch (e) {
      res.status(HTTPCode.SERVER_ERROR).send(e.message);
    }
  } else {
    res.status(HTTPCode.BAD_REQUEST).send('Bad Request');
  }
});