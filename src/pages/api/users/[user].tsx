import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../../utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const userData = await getUser(req);

      res
        .status(200)
        .json({ integrations: userData?.integrations, settings: userData?.integration_settings, info: userData?.info });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
};
