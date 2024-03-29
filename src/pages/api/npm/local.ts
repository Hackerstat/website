import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getLocalNPM } from '../../../utils/mongo';
import { handleRes } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @REMOVE
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      // const {
      //   query: { username },
      // } = req;

      const npmLocalRes = await getLocalNPM(req, res);
      handleRes({ res, status: StatusTypes.OK, jsonData: npmLocalRes });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});
