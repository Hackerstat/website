import { ValidationError } from 'yup';
import { setUsername, getUsername } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import { usernameQueryValidator } from '../../../utils/validation';
import { HTTPCode } from '../../../utils/constants';
import auth0 from '../../../utils/auth';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      const { newUsername } = req.body;

      try {
        await usernameQueryValidator(req.body);
      } catch ({ message }) {
        res.status(HTTPCode.BAD_REQUEST).send(message);
        return;
      }
      if (!newUsername) {
        res.status(400).send('You need to provide a username');
        return;
      }

      if (await setUsername(newUsername, sub)) {
        res.status(HTTPCode.OK).json({ result: true });
      } else {
        res.status(HTTPCode.OK).json({ result: false });
      }
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('FAIL');
    }
  } else if (req.method === 'GET') {
    try {
      const currentUser = await getUsername(req, res);
      res.status(HTTPCode.OK).json({ username: currentUser?.username || null });
    } catch (e) {
      res.status(HTTPCode.SERVER_ERROR).send('FAIL');
    }
  }
});
