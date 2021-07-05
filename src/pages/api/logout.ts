import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../utils/constants';
import auth0 from '../../utils/auth';

/**
 * @name logout
 * @description It is the function that is used by auth0 to login/signup a user.
 * @author @LouisIV
 * @returns {void}
 */
export default async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || HTTPCode.SERVER_ERROR).end(error.message);
  }
}
