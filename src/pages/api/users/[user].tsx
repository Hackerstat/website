import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const { user } = req.query;

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      const userData = await client.db('Atlas').collection('userProfiles').findOne({ username: user });

      res.status(200).json({
        integrations: userData?.integrations,
        settings: userData?.integration_settings,
        info: { ...userData?.info, photo: userData?.picture },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
};
