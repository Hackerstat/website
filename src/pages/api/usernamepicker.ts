import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async function usernameChecker(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { newUsername } = req.query;

      if (!newUsername) {
        res.status(400).send('You need to provide a username');
        return;
      }

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      const possibleUser = await client.db('Atlas').collection('userProfiles').findOne({ username: newUsername });

      if (!possibleUser) {
        res.status(200).json({ result: true });
      } else {
        res.status(200).json({ result: false });
      }
      client.close();
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  }
}
