import { NextApiRequest, NextApiResponse } from 'next';
import { addWakaTimeIntegration } from '../../../utils/mongo';
import { addWakaTimeIntegrationValidator } from '../../../utils/validation';
import auth0 from '../../../utils/auth';

import { HTTPCode } from '../../../utils/constants';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'POST') {
      const { user } = await auth0.getSession(req);
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
