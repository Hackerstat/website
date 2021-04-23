import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { removeIntegration } from '../../../utils/mongo';

// Requires integration to be removed in the body under integrationType.
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    removeIntegration(req);
    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
    res.status(500).send('FAIL');
  }
});
