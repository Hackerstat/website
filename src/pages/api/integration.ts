import { HTTPCode } from '../../utils/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettingsValidator } from '../../utils/validation';
import { addIntegrationInSettings } from '../../utils/mongo';
import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      try {
        await addIntegrationInSettingsValidator(req.body);
      } catch ({ message }) {
        res.status(HTTPCode.BAD_REQUEST).send(message);
        return;
      }
      await addIntegrationInSettings(req);
      res.status(HTTPCode.OK).send('Added Account');
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Server Error');
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
