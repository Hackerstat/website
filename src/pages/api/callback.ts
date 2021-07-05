import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth';

/**
 * @name callback
 * @description It is the function that handles the auth0 callback when a user is either logged in or signed up.
 * @author @LouisIV
 * @returns {void}
 */
export default async function callback(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await auth0.handleCallback(req, res, {
      afterCallback: async (req, res, session, state) => {
        return {
          ...session,
          user: {
            ...session.user,
            username: 'Username from the database',
          },
        };
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
