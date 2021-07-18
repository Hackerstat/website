import { NextApiRequest, NextApiResponse } from 'next';
import { getUsername } from '../../../utils/mongo';
import { validateStackOverflowAccountScrape } from '../../../utils/thrdAPIs';
import { handleRes, StatusTypes, mediumUserNameQueryValidator } from '../../../utils';
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
