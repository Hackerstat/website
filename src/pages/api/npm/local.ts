import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getLocalNPM } from '../../../utils/mongo';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      // const {
      //   query: { username },
      // } = req;

      const npmLocalRes = await getLocalNPM(req);
      res.status(200).json(npmLocalRes);
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  }
});
