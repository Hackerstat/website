import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { RetrievedIUserProfileData } from '../utils';
import { URI, HACKERSTAT, USERPROFILES, INFO_PROPERTY } from './constants';
import auth0 from '../auth';

// TODO: Limit projected values from mongoDB queries.

export const getInfo = async (req: NextApiRequest): Promise<RetrievedIUserProfileData> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  client.close();

  if (userInfo.hasOwnProperty(INFO_PROPERTY)) {
    return userInfo.info as RetrievedIUserProfileData;
  }
  return {};
};
