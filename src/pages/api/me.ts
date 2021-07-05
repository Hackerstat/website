import { HTTPCode } from '../../utils/constants';
import auth0 from '../../utils/auth';

/**
 * @name me
 * @description It is the function for auth0 that retrieves the HackerStat user's profile.
 * @author @LouisIV
 * @returns {void}
 */
export default async function me(req, res): Promise<void> {
  try {
    await auth0.handleProfile(req, res, {});
  } catch (error) {
    console.error(error);
    res.status(error.status || HTTPCode.SERVER_ERROR).end(error.message);
  }
}
