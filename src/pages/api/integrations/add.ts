import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationInfo } from '../../../utils/mongo';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { username },
    } = req;

    // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const npmInfo = await client.db('HackerStat').collection('userProfiles').findOne({ username: username });

    getIntegrationInfo('npm', username);
    // perform actions on the collection object
    client.close();
    res.status(200).json(JSON.stringify(npmInfo));
  } catch (e) {
    res.status(500).send('Server Error');
  }
};
