import { HTTPCode } from '../../utils/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettingsValidator } from '../../utils/validation';
import { addIntegrationInSettings } from '../../utils/mongo';
import auth0 from '../../utils/auth';

/**
 * @name integration
 * @description It is a function that adds an integration (i.e. gitHub, NPM) to a user's HackerStat Profile.
 * @author @Cgunter1
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      try {
        const { integrationType, settings } = await addIntegrationInSettingsValidator(req.body);
        console.log(integrationType, settings);
      } catch ({ message }) {
        res.status(HTTPCode.BAD_REQUEST).send(message);
        return;
      }
      await addIntegrationInSettings(req, res);
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
