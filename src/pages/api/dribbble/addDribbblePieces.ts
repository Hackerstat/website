import { NextApiRequest, NextApiResponse } from 'next';
import {
  handleRes,
  StatusTypes,
  addIntegrationInSettingsValidator,
  addDribbblePiecesValidator,
  validateDribbbleAccountScrape,
} from '../../../utils';
import { addDribbbleData, getUsername } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

/**
 * @name addDribbblePieces
 * @description It is a function that adds the Dribbble integration to a user's HackerStat Profile.
 * @author @Cgunter1
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req, res);

      const { sub } = user;
      const [{ dribbbleUsername, dribbblePieces }] = await Promise.all([
        addDribbblePiecesValidator(req.body),
        addIntegrationInSettingsValidator(req.body?.integrationInfo),
      ]);

      const { username: hackerStatUsername } = await getUsername(req, res);
      const isValidated = await validateDribbbleAccountScrape(dribbbleUsername, hackerStatUsername);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Wierd TypeError Bug.
      await addDribbbleData({ sub, dribbbleUsername, dribbblePieces, isValidated });
      // await addIntegrationInSettings(req, res);
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
