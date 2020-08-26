import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { username },
    } = req;
    const { userName, password, ...profileInfoData } = await JSON.parse(req.body);
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(uri, { useNewUrlParser: true });

    await client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { username: username },
        { $setOnInsert: { username: username }, $set: { profileInfo: profileInfoData } },
        { useUnifiedTopology: true, upsert: true },
      );

    res.status(200).send('OK');
  } catch (e) {
    res.status(500).send('Server Error');
  }
};

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
