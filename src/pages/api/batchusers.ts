import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth';
import { HTTPCode } from '../../utils/constants';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
export default async function batchusers(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      const users = await client
        .db('HackerStat')
        .collection('userProfiles')
        .find({ username: { $exists: true } })
        .limit(20);
      const userInfo = await users.toArray();
      res.status(200).json({ users: userInfo });
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('FAIL');
  }
}
