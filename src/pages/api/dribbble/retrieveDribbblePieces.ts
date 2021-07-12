import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes } from '../../../utils';
import auth0 from '../../../utils/auth';

/**
 * @name retrieveDribbblePieces
 * @description Retrieves all the work associated with a Dribbble username.
 * @author Cgunter1
 * @argument {string} dribbleUsername
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  }
});
