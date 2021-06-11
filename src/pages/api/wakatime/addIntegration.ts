import { NextApiRequest, NextApiResponse } from 'next';
import { addWakaTimeIntegration } from '../../../utils/mongo';
import { addWakaTimeIntegrationValidator } from '../../../utils/validation';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

/**
 * @name addIntegration
 * @description It is the function that adds WakaTime integration to the authenticated user's HackerStat Profile.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @argument {string} wakaTimeCodingActivityURL It is the user's daily activity HTTP URL on WakaTime.
 * @argument {string} wakaTimeLanguageURL It is the user's percentage of languages HTTP URL on WakaTime.
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'POST') {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;

      const { wakaTimeCodingActivityURL, wakaTimeLanguageURL } = await addWakaTimeIntegrationValidator(req.body);
      await addWakaTimeIntegration({ sub, wakaTimeCodingActivityURL, wakaTimeLanguageURL });

      res.status(HTTPCode.OK).send('CREATED');
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
});
