import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { username },
    } = req;

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const npmInfo = await client.db('Atlas').collection('userProfiles').findOne({ username: username });

    client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { username: username },
        {
          $setOnInsert: { username: username },
          $set: { npmUsername: npmUsername, packages: packageNames },
        },
        { useUnifiedTopology: true, upsert: true },
      );

    console.log(npmInfo);
    // perform actions on the collection object
    client.close();
    res.status(200).json(JSON.stringify(npmInfo));
  } catch (e) {
    res.status(500).send('Server Error');
  }
};
