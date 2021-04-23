import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES, NO_INTEGRATION_TYPE_ERROR, NO_SETTINGS_OBJECT } from './constants';
import auth0 from '../auth';

export const addIntegrationInSettings = async (req: NextApiRequest): Promise<void> => {
  const { user } = await auth0.getSession(req);
  const { sub, name } = user;

  // TODO: ADD VALIDATION
  const { integrationType, settings } = req.body;

  if (!integrationType) {
    throw new Error(NO_INTEGRATION_TYPE_ERROR);
  }

  if (!settings) {
    throw new Error(NO_SETTINGS_OBJECT);
  }

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { authID: sub },
      {
        $setOnInsert: { authID: sub, username: name },
        $set: { [`integration_settings.${integrationType}`]: settings },
        $addToSet: { integrations: integrationType },
      },
      { upsert: true },
    );
  client.close();
};
