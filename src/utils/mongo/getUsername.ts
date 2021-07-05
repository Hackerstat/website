import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

const userProfileOptions = {
  projection: {
    username: 1,
  },
};

export const getUsername = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const currentUser = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub }, userProfileOptions);
  client.close();
  return currentUser;
};
