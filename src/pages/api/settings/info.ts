import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

interface IUserProfileData {
  firstName: string;
  lastName: string;
  website: string;
  email: string;
  bio: string;
  school: string;
  location: string;
}

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
      try {
        const { user } = await auth0.getSession(req);
        const { sub, name } = user;

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
        const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;

        const client = await MongoClient.connect(uri, { useNewUrlParser: true });

        await client
          .db('Atlas')
          .collection('userProfiles')
          .updateOne(
            { authId: sub },
            { $setOnInsert: { authId: sub }, $set: { info: { ...userProfileData } } },
            { useUnifiedTopology: true, upsert: true },
          );

        res.status(200).send('OK');
      } catch (e) {
        res.status(500).send('Server Error');
      }
    }
  },
);

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
