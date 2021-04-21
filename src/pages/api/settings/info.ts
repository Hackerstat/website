import { updateInfo, getInfo } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
      try {
        await updateInfo(req);
        res.status(200).send('OK');
      } catch (e) {
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'GET') {
      try {
        const info = await getInfo(req);
        res.status(200).json(info);
      } catch (e) {
        res.status(500).send('Server Error');
      }
    }
  },
);

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
