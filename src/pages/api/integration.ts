import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req);
      const { sub, name } = user;

      const { integrationType, settings } = req.body;

      console.log(req.body, integrationType, !integrationType);

      if (!integrationType) {
        throw new Error('No integration type provided');
      }

      if (!settings) {
        throw new Error('No settings object provided');
      }

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      await client
        .db('Atlas')
        .collection('userProfiles')
        .updateOne(
          { authID: sub },
          {
            $setOnInsert: { authID: sub, username: name },
            $set: { [`integration_settings.${integrationType}`]: settings },
            $push: { integrations: integrationType },
          },
          { useUnifiedTopology: true, upsert: true },
        );
      res.status(200).send('Added Account');
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  } else if (req.method === 'GET') {
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const userProfile = await client.db('Atlas').collection('userProfiles').findOne({ username: username });
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
