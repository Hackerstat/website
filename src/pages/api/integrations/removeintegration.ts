import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { removeIntegration } from '../../../utils/mongo';
import { removeIntegrationInSettingsValidator } from '../../../utils/validation';
import { handleRes } from '../../../utils';
import { StatusTypes } from '../../../types';

/**
 * @REMOVE
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    try {
      await removeIntegrationInSettingsValidator(req.body);
    } catch ({ message }) {
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
      return;
    }

    removeIntegration(req, res);
    handleRes({ res, status: StatusTypes.OK });
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
});
