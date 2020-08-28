import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = await auth0.getSession(req);
    const { sub, name } = user;

    const { integrationType, username } = JSON.parse(req.body);

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const userProfileInfo = await client.db('Atlas').collection('userProfiles').findOne({ authID: sub });
    if (userProfileInfo) {
      if (Object(userProfileInfo).hasOwnProperty('integrations')) {
        if (userProfileInfo.integrations.includes(integrationType)) {
          await client
            .db('Atlas')
            .collection('userProfiles')
            .updateOne(
              { authID: sub },
              {
                $setOnInsert: { authID: sub, username: name },
                $set: { [`integration_settings.${integrationType}`]: { username: username } },
              },
              { useUnifiedTopology: true, upsert: true },
            );
          res.status(200).send('OK');
          return;
        }
      }
    }
    await client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { authID: sub },
        {
          $setOnInsert: { authID: sub, username: name },
          $set: { [`integration_settings.${integrationType}`]: { username: username } },
          $push: { integrations: integrationType },
        },
        { useUnifiedTopology: true, upsert: true },
      );
    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};