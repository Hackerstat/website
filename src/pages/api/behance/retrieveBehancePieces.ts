import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, retrieveBehancePiecesValidator, retrieveBehanceAccountScrape } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';
import auth0 from '../../../utils/auth';

/**
 * @name retrieveBehancePieces
 * @description It is a function that retrieves the Behance Work Pieces from a Behance username.
 * @author @Cgunter1
 * @argument {string} behanceUsername
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HttpCodes.GET) {
    try {
      const { behanceUsername } = await retrieveBehancePiecesValidator(req.query);

      const behanceProjects = await retrieveBehanceAccountScrape(behanceUsername);
      handleRes({ res, status: StatusTypes.OK, jsonData: { behanceProjects } });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
});
