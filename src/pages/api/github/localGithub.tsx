import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { user } = await auth0.getSession(req);
    const { sub } = user;

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const gitInfo = await client.db('Atlas').collection('userProfiles').findOne({ authID: sub });

    if (gitInfo) {
      if (Object(gitInfo).hasOwnProperty('integration_cache')) {
        if (Object(gitInfo.integration_cache).hasOwnProperty('github')) {
          res.status(200).json(gitInfo.integration_cache.github);
          return;
        }
      }
    }

    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});
