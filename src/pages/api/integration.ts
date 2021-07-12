import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettings } from '../../utils/mongo';
import { handleRes, StatusTypes, addIntegrationInSettingsValidator } from '../../utils';
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
        handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
        return;
      }
      await addIntegrationInSettings(req, res);
      handleRes({ res, status: StatusTypes.OK, message: 'Added Account' });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
