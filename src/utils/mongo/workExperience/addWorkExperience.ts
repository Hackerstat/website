import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { WorkExperienceType } from '../../utils';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import auth0 from '../../auth';

export const addWorkExperience = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const workExperienceData = <WorkExperienceType>req.body;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });

  await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { authID: sub },
      { $setOnInsert: { authID: sub }, $push: { workExperience: workExperienceData } },
      { upsert: true },
    );
  client.close();
};
