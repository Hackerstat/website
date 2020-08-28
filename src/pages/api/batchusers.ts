import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      const users = await client
        .db('Atlas')
        .collection('userProfiles')
        .find({ username: { $exists: true } })
        .limit(20);
      console.log(await users.toArray());
      const userInfo = await users.toArray();
      res.status(200).json({ users: userInfo });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('FAIL');
  }
});
