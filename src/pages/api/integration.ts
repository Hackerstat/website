import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req);
      const { sub, name } = user;

      const { integrationType, settings } = req.body;

      if (!integrationType) {
        throw new Error('No integration type provided');
      }

      if (!settings) {
        throw new Error('No settings object provided');
      }

      // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      await client
        .db('HackerStat')
        .collection('userProfiles')
        .updateOne(
          { authID: sub },
          {
            $setOnInsert: { authID: sub, username: name },
            $set: { [`integration_settings.${integrationType}`]: settings },
            $addToSet: { integrations: integrationType },
          },
          { useUnifiedTopology: true, upsert: true },
        );
      client.close();

      res.status(200).send('Added Account');
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  } else if (req.method === 'GET') {
    const { username } = req.body;

    if (!username) {
      res.status(400).send('You have to provide a username');
      return;
    }

    // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const userProfile = await client.db('HackerStat').collection('userProfiles').findOne({ username: username });
    client.close();

    return userProfile;
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
