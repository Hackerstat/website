import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { WorkExperienceType, UserProfileType } from '../utils';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const retrieveWorkExperience = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Array<WorkExperienceType>> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userData = <UserProfileType>await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  client.close();

  return userData.workExperience;
};
