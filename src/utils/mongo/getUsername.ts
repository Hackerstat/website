import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const getUsername = async (req: NextApiRequest): Promise<any> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const currentUser = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  client.close();
  return currentUser;
};
