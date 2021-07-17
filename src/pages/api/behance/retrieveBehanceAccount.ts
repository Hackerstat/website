import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, retrieveBehancePiecesValidator, retrieveBehanceAccountScrape } from '../../../utils';
import auth0 from '../../../utils/auth';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
