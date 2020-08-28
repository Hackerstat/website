import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Requires integration to be removed in the body under integrationType.
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { user } = await auth0.getSession(req);
    const { sub } = user;

    const { integrationType } = JSON.parse(req.body);

    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    await client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { authID: sub },
        { $unset: { [`integration_cache.${integrationType}`]: '', [`integration_settings.${integrationType}`]: '' } },
      );

    await client
      .db('Atlas')
      .collection('userProfiles')
      .update({ authID: sub }, { $pull: { integrations: integrationType } });
    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
    res.status(500).send('FAIL');
  }
});
