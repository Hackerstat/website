import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserProfileType } from '../types';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import auth0 from '../../auth';

export const getIntegrationInfoViaSub = async (req: NextApiRequest, res: NextApiResponse): Promise<UserProfileType> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = <UserProfileType>await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });

  return userInfo;
};
