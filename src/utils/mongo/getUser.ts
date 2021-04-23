import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { UserProfileType } from '../utils';
import { URI, HACKERSTAT, USERPROFILES } from './constants';

export const getUser = async (req: NextApiRequest): Promise<UserProfileType> => {
  const { user } = req.query;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userData = <UserProfileType>await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: user });

  return userData;
};
