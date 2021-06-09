import { NextApiRequest, NextApiResponse } from 'next';
import { userQueryValidator } from '../../../utils/validation';
import { getUser } from '../../../utils/mongo';
import { HTTPCode } from '../../../utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      // TODO: Test this!
      try {
        await userQueryValidator(req.query);
      } catch ({ message }) {
        res.status(HTTPCode.BAD_REQUEST).send(message);
        return;
      }
      const userData = await getUser(req);
      res
        .status(HTTPCode.OK)
        .json({ integrations: userData?.integrations, settings: userData?.integration_settings, info: userData?.info });
    } catch (err) {
      console.log(err);
      res.status(HTTPCode.SERVER_ERROR).send('Server Error');
    }
  }
};
