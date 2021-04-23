import { MongoClient } from 'mongodb';
import { UserProfileType } from '../utils';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const getIntegrationInfoViaSub = async (req: NextApiRequest): Promise<UserProfileType> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = <UserProfileType>await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });

  return userInfo;
};
