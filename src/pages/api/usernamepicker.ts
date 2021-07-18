import { NextApiRequest, NextApiResponse } from 'next';
import { usernameCheckerAPI } from './../../utils/mongo';
import { handleRes, userNameCheckerQueryValidator } from '../../utils';
import { StatusTypes, HttpCodes } from '../../types';

/**
 * @name usernameChecker
 * @description It is a function that checks if a username given already exists by another HackerStat user.
 * @author @LouisIV @Cgunter1
 * @argument {string} newUsername It is a new username that is checked if another HackerStat user has than username.
 * @returns {void}
 */
export default async function usernameChecker(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      await userNameCheckerQueryValidator(req.query);
    } catch ({ message }) {
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
      return;
    }
    try {
      const possibleUser = await usernameCheckerAPI(req);
      switch (possibleUser.m) {
        case 'true':
          handleRes({ res, status: StatusTypes.OK, jsonData: { result: true } });
          break;
        case 'false':
          handleRes({ res, status: StatusTypes.OK, jsonData: { result: false } });
          break;
        case 'You need to provide a username':
          handleRes({ res, status: StatusTypes.BAD_REQUEST, message: possibleUser.m });
          break;
        default:
          console.error('Should not be possible to be here');
          break;
      }
    } catch ({ message }) {
      console.error(message);
      handleRes({ res, status: StatusTypes.SERVER_ERROR, message });
    }
  }
}
