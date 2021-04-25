import { updateInfo, getInfo } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { userInfoQueryValidator } from '../../../utils/validation';
import { HTTPCode } from '../../../utils/constants';

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
      try {
        try {
          await userInfoQueryValidator(req.body);
        } catch ({ message }) {
          res.status(HTTPCode.BAD_REQUEST).send(message);
          return;
        }
        await updateInfo(req);
        res.status(HTTPCode.OK).send('OK');
      } catch (e) {
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'GET') {
      try {
        const info = await getInfo(req);
        res.status(HTTPCode.OK).json(info);
      } catch (e) {
        res.status(HTTPCode.SERVER_ERROR).send('Server Error');
      }
    }
  },
);

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
