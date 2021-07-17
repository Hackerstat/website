import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, retrieveDribbblePiecesValidator, validateDribbbleAccountScrape } from '../../../utils';
import { getUsername } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

/**
 * @name validateDribbbleAccount
 * @description Validates if a Dribbble Account belongs to the HackerStat user.
 * @author Cgunter1
 * @argument {string} dribbleUsername
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { dribbbleUsername } = await retrieveDribbblePiecesValidator(req.query);
      const { username: hackerStatUsername } = await getUsername(req, res);
      const validated = await validateDribbbleAccountScrape(dribbbleUsername, hackerStatUsername);
      if (validated) {
        handleRes({
          res,
          status: StatusTypes.OK,
          jsonData: { validated },
        });
      } else {
        handleRes({ res, status: StatusTypes.NOT_FOUND, jsonData: { validated } });
      }
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST, message: 'Bad Header' });
  }
});
