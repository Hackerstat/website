import { NextApiRequest, NextApiResponse } from 'next';
import { mediumUserNameQueryValidator, HTTPCode } from '../../../utils';
import { getUsername } from '../../../utils/mongo';
import { validateMediumAccountScrape } from '../../../utils/thrdAPIs';
import auth0 from '../../../utils/auth';

/**
 * @name validateMediumAccount
 * @description The function validates if a user's Medium account is their's by checking the Medium user's profile bio for `http://hackerstat.io/{hackerStatUsername}`.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @param {string} username Medium Account Username.
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { username } = await mediumUserNameQueryValidator(req.query);
      const { username: hackerStatUsername } = await getUsername(req, res);
      const isValidated = await validateMediumAccountScrape(username, hackerStatUsername || '');
      res.status(HTTPCode.OK).json({ validated: isValidated });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send(e.message);
    }
  } else {
    res.status(HTTPCode.BAD_REQUEST).send('Bad Request');
  }
});
