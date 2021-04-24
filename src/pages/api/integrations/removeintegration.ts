import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { removeIntegration } from '../../../utils/mongo';
import { removeIntegrationInSettingsValidator } from '../../../utils/validation';
import { HTTPCode } from '../../../utils/constants';

// Requires integration to be removed in the body under integrationType.
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    try {
      await removeIntegrationInSettingsValidator(req.body);
    } catch ({ message }) {
      res.status(HTTPCode.BAD_REQUEST).send(message);
      return;
    }

    removeIntegration(req);
    res.status(HTTPCode.OK).send('OK');
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('FAIL');
  }
});
