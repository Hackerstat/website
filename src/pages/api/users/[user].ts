import { NextApiRequest, NextApiResponse } from 'next';
import { userQueryValidator } from '../../../utils/validation';
import { getUser } from '../../../utils/mongo';
import { HTTPCode } from '../../../utils/constants';

/**
 * @name [user]
 * @description This function retrieves a hackerStat User's profile info (i.e. integrations, personal info).
 * @author @Cgunter1 @LouisIV
 * @argument {string} user It is the HackerStat username that the info is being retrieved for.
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      try {
        await userQueryValidator(req.query);
      } catch ({ message }) {
        res.status(HTTPCode.BAD_REQUEST).send(message);
        return;
      }
      const userData = await getUser(req);
      const jsonResponse = {
        integrations: userData?.integrations,
        settings: userData?.integration_settings,
        info: userData?.info,
        workExperience: userData?.workExperience,
      };
      res.status(HTTPCode.OK).json(jsonResponse);
    } catch (err) {
      console.log(err);
      res.status(HTTPCode.SERVER_ERROR).send('Server Error');
    }
  }
};
