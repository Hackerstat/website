import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getLocalNPM } from '../../../utils/mongo';
import { HTTPCode } from '../../../utils/constants';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      // const {
      //   query: { username },
      // } = req;

      const npmLocalRes = await getLocalNPM(req, res);
      res.status(HTTPCode.OK).json(npmLocalRes);
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Server Error');
    }
  }
});
