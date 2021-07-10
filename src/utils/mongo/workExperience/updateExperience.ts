import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../auth';

export const updateExperience = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const requestBody = req.body;
  const { i, ...workExperienceData } = requestBody;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });

  const setString = `workExperience.${i}`;

  const workExperienceObj = {};

  workExperienceObj[setString] = workExperienceData;

  await client.db(HACKERSTAT).collection(USERPROFILES).updateOne({ authID: sub }, { $set: workExperienceObj });

  client.close();
};
