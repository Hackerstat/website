import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import {
  addBehancePiecesValidator,
  addIntegrationInSettingsValidator,
  validateBehanceAccountScrape,
  handleRes,
} from '../../../utils';
import { HttpCodes, StatusTypes } from '../../../types';
import { getUsername, addBehanceData } from '../../../utils/mongo';

/**
 * @name addBehancePieces
 * @description It is a function that validates a behance account.
 * @author @Cgunter1
 * @argument {string} behanceUsername
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HttpCodes.POST) {
    try {
      const { user } = await auth0.getSession(req, res);

      const { sub } = user;

      const [{ behanceUsername, behanceWorkPieces }] = await Promise.all([
        addBehancePiecesValidator(req.body),
        addIntegrationInSettingsValidator(req.body?.integrationInfo),
      ]);

      const { username: hackerStatUsername } = await getUsername(req, res);
      const isValidated = await validateBehanceAccountScrape(behanceUsername, hackerStatUsername);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Wierd TypeError Bug.
      await addBehanceData({ sub, behanceUsername, behanceWorkPieces, isValidated });
      handleRes({ res, status: StatusTypes.CREATED });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
});
