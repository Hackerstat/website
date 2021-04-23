import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationInfo } from '../../../utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { username },
    } = req;

    const npmInfo = await getIntegrationInfo(username);
    // perform actions on the collection object
    res.status(200).json(JSON.stringify(npmInfo));
  } catch (e) {
    res.status(500).send('Server Error');
  }
};
