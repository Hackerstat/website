import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';

export const usernameCheckerAPI = async (req: NextApiRequest): Promise<{ s: number; m: string }> => {
  const { newUsername } = req.query;

  if (!newUsername) {
    return { s: 400, m: 'You need to provide a username' };
  }

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const possibleUser = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: newUsername });

  client.close();

  return !possibleUser ? { s: 200, m: 'true' } : { s: 200, m: 'false' };
};
