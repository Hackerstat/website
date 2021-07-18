import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../auth';

interface IUserProfileData {
  firstName: string;
  lastName: string;
  website: string;
  email: string;
  bio: string;
  school: string;
  location: string;
}

export const updateInfo = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const { firstName, lastName, website, email, bio, school, location } = req.body;

  const userProfileData: Partial<IUserProfileData> = {};

  if (firstName) {
    userProfileData.firstName = firstName;
  }

  if (lastName) {
    userProfileData.lastName = lastName;
  }

  if (website) {
    userProfileData.website = website;
  }

  if (email) {
    userProfileData.email = email;
  }

  if (bio) {
    userProfileData.bio = bio;
  }

  if (school) {
    userProfileData.school = school;
  }

  if (location) {
    userProfileData.location = location;
  }

  const {} = req.body;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { authID: sub },
      { $setOnInsert: { authID: sub }, $set: { info: { ...userProfileData } } },
      { upsert: true },
    );
};
