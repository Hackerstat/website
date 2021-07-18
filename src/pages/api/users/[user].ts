import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../../utils/mongo';
import { handleRes, userQueryValidator } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name [user]
 * @description This function retrieves a hackerStat User's profile info (i.e. integrations, personal info).
 * @author @Cgunter1 @LouisIV
 * @argument {string} user It is the HackerStat username that the info is being retrieved for.
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === HttpCodes.GET) {
    try {
      try {
        await userQueryValidator(req.query);
      } catch ({ message }) {
        handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
        return;
      }
      const userData = await getUser(req);
      const jsonResponse = {
        integrations: userData?.integrations,
        settings: userData?.integration_settings,
        info: userData?.info,
        workExperience: userData?.workExperience,
      };
      handleRes({ res, status: StatusTypes.OK, jsonData: jsonResponse });
    } catch (err) {
      console.log(err);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
};
