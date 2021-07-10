import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeleteExperienceParams, UserProfileType } from '../../utils';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import auth0 from '../../auth';

export const deleteExperience = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const requestQuery = <DeleteExperienceParams>req.query;
  const { i, ...workExperienceData } = requestQuery;

  const index = parseInt(i);

  const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const session = client.startSession();

  const setString = `workExperience.${i}`;

  const workExperienceObj = {};

  workExperienceObj[setString] = workExperienceData;

  try {
    // Making sure that removing a workExperience item is automic.
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      userProfile.workExperience.splice(index, 1);

      await client
        .db(HACKERSTAT)
        .collection(USERPROFILES)
        .updateOne({ authID: sub }, { $set: { workExperience: userProfile.workExperience } });
    });
  } catch (err) {
    throw new Error(err);
  } finally {
    session.endSession();
    client.close();
  }
};
