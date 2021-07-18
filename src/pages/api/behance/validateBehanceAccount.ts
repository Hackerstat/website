import auth0 from '../../../utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, retrieveBehancePiecesValidator, validateBehanceAccountScrape } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';
import { getUsername } from '../../../utils/mongo';

/**
 * @name validateBehanceAccount
 * @description It is a function that validates a behance account.
 * @author @Cgunter1
 * @argument {string} behanceUsername
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HttpCodes.GET) {
    const { behanceUsername } = await retrieveBehancePiecesValidator(req.query);
    const { username: hackerStatUsername } = await getUsername(req, res);
    const validated = await validateBehanceAccountScrape(behanceUsername, hackerStatUsername);
    handleRes({ res, status: validated ? StatusTypes.OK : StatusTypes.NOT_FOUND, jsonData: { validated } });
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
});
