import { MongoClient } from 'mongodb';
import npmUserPackages from 'npm-user-packages';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSettings } from '../../../utils/getUserSettings';
import auth0 from '../../../utils/auth';

/**
 * body: {
 *  soID: 214saa23
 * }
 */
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      res.status(200).send('CREATED');
    } catch (e) {
      console.error(e);
      res.status(400).send('FAIL');
    }
  }
});
