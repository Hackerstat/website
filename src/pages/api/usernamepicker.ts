import { HTTPCode } from '../../utils/constants';
import { usernameCheckerAPI } from './../../utils/mongo';
import { userNameCheckerQueryValidator } from '../../utils/validation';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function usernameChecker(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      await userNameCheckerQueryValidator(req.query);
    } catch ({ message }) {
      res.status(HTTPCode.BAD_REQUEST).send(message);
      return;
    }
    try {
      const possibleUser = await usernameCheckerAPI(req);
      switch (possibleUser.m) {
        case 'true':
          res.status(HTTPCode.OK).json({ result: true });
          break;
        case 'false':
          res.status(HTTPCode.OK).json({ result: false });
          break;
        case 'You need to provide a username':
          res.status(HTTPCode.BAD_REQUEST).send(possibleUser.m);
          break;
        default:
          console.error('Should not be possible to be here');
          break;
      }
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('FAIL');
    }
  }
}
