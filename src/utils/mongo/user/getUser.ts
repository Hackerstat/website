import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { UserProfileType } from '../types';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';

export const getUser = async (req: NextApiRequest): Promise<UserProfileType> => {
  const { user } = req.query;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userData = <UserProfileType>await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: user });
  console.log('----23-----');
  console.log(userData);
  return userData;
};
