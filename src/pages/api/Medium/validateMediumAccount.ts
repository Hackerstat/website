import { NextApiRequest, NextApiResponse } from 'next';
import { getUsername } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, mediumUserNameQueryValidator, validateMediumAccountScrape } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name validateMediumAccount
 * @description The function validates if a user's Medium account is their's by checking the Medium user's profile bio for `http://hackerstat.io/{hackerStatUsername}`.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @param {string} username Medium Account Username.
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const { username } = await mediumUserNameQueryValidator(req.query);
      const { username: hackerStatUsername } = await getUsername(req, res);
      const isValidated = await validateMediumAccountScrape(username, hackerStatUsername || '');
      handleRes({
        res,
        status: isValidated ? StatusTypes.OK : StatusTypes.NOT_FOUND,
        jsonData: { validated: isValidated },
      });
    } catch ({ message }) {
      handleRes({ res, status: StatusTypes.SERVER_ERROR, message });
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
});
