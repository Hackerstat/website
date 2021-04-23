import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettings } from '../../utils/mongo';
import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await addIntegrationInSettings(req);
      res.status(200).send('Added Account');
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
