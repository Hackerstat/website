import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getIntegrationInfoViaSub } from '../../../utils/mongo';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const gitInfo = await getIntegrationInfoViaSub(req);

    if (gitInfo) {
      if (Object(gitInfo).hasOwnProperty('integration_cache')) {
        if (Object(gitInfo.integration_cache).hasOwnProperty('github')) {
          res.status(200).json(gitInfo.integration_cache.github);
          return;
        }
      }
    }

    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});
