import { setUsername, getUsername } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import { usernameQueryValidator } from '../../../utils/validation';
import { handleRes, StatusTypes } from '../../../utils';
import auth0 from '../../../utils/auth';

/**
 * @name username
 * @description This function both adds and/or retrieves a user's HackerStat username.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @argument {string} newUsername The new HackerStat username that the user wants for their profile.
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      const { newUsername } = req.body;

      try {
        await usernameQueryValidator(req.body);
      } catch ({ message }) {
        handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
        return;
      }
      if (!newUsername) {
        res.status(400).send('You need to provide a username');
        return;
      }

      if (await setUsername(newUsername, sub)) {
        handleRes({ res, status: StatusTypes.OK, jsonData: { result: true } });
      } else {
        handleRes({ res, status: StatusTypes.OK, jsonData: { result: false } });
      }
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else if (req.method === 'GET') {
    try {
      const currentUser = await getUsername(req, res);
      const jsonData = { username: currentUser?.username || null };
      handleRes({ res, status: StatusTypes.OK, jsonData });
    } catch (e) {
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});
