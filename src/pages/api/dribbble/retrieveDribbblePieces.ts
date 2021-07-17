import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, retrieveDribbblePiecesValidator, retrieveDribbblePiecesScrape } from '../../../utils';
import auth0 from '../../../utils/auth';

/**
 * @name retrieveDribbblePieces
 * @description Retrieves all the work associated with a Dribbble username.
 * @author Cgunter1
 * @argument {string} dribbleUsername
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { dribbbleUsername } = await retrieveDribbblePiecesValidator(req.query);
      const dribbblePieces = await retrieveDribbblePiecesScrape(dribbbleUsername);
      handleRes({ res, status: StatusTypes.OK, jsonData: dribbblePieces });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST, message: 'Bad Header' });
  }
});
