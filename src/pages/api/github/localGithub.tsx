import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getIntegrationInfoViaSub } from '../../../utils/mongo';
import { HTTPCode } from '../../../utils/constants';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const gitInfo = await getIntegrationInfoViaSub(req, res);

    if (gitInfo) {
      if (Object(gitInfo).hasOwnProperty('integration_cache')) {
        if (Object(gitInfo.integration_cache).hasOwnProperty('github')) {
          res.status(HTTPCode.OK).json(gitInfo.integration_cache.github);
          return;
        }
      }
    }

    res.status(HTTPCode.OK).json({});
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
});
