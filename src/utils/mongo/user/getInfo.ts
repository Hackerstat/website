import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { URI, HACKERSTAT, USERPROFILES, INFO_PROPERTY } from '../constants';
import { RetrievedIUserProfileData } from '../types';
import auth0 from '../../auth';

// TODO: Limit projected values from mongoDB queries.

export const getInfo = async (req: NextApiRequest, res: NextApiResponse): Promise<RetrievedIUserProfileData> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  client.close();

  if (userInfo.hasOwnProperty(INFO_PROPERTY)) {
    return userInfo.info as RetrievedIUserProfileData;
  }
  return {};
};
