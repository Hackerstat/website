import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getIntegrationInfoViaSub } from '../../../utils/mongo';
import { handleRes, StatusTypes } from '../../../utils';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const gitInfo = await getIntegrationInfoViaSub(req, res);

    if (gitInfo) {
      if (Object(gitInfo).hasOwnProperty('integration_cache')) {
        if (Object(gitInfo.integration_cache).hasOwnProperty('github')) {
          handleRes({ res, status: StatusTypes.OK, jsonData: gitInfo.integration_cache.github });
          return;
        }
      }
    }

    handleRes({ res, status: StatusTypes.OK, jsonData: {} });
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
});
