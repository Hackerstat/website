import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateExperience, deleteExperience } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
      try {
        const { user } = await auth0.getSession(req);
        const { sub } = user;

        // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
        const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const userData = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
        client.close();

        const workExperience = userData.workExperience;

        res.status(200).json({ workExperience: workExperience });
      } catch (e) {
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'POST') {
      try {
        const { user } = await auth0.getSession(req);
        const { sub } = user;

        const workExperienceData = req.body;
        // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
        const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
        console.log('sadasddsa');

        await client
          .db('HackerStat')
          .collection('userProfiles')
          .updateOne(
            { authID: sub },
            { $setOnInsert: { authID: sub }, $push: { workExperience: workExperienceData } },
            { useUnifiedTopology: true, upsert: true },
          );
        client.close();

        res.status(200).send('OK');
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'PATCH') {
      try {
        await updateExperience(req);
        res.status(204).send('UPDATED');
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    } else if (req.method === 'DELETE') {
      try {
        await deleteExperience(req);
        res.status(204).send('DELETED');
      } catch (e) {
        console.error(e);
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
