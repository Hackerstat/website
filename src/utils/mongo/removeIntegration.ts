import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const removeIntegration = async (req: NextApiRequest): Promise<void> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const { integrationType } = JSON.parse(req.body);

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const session = client.startSession();

  try {
    // Making sure that removing a workExperience item is automic.
    await session.withTransaction(async () => {
      await client
        .db(HACKERSTAT)
        .collection(USERPROFILES)
        .updateOne(
          { authID: sub },
          { $unset: { [`integration_cache.${integrationType}`]: '', [`integration_settings.${integrationType}`]: '' } },
        );

      await client
        .db(HACKERSTAT)
        .collection(USERPROFILES)
        .updateOne({ authID: sub }, { $pull: { integrations: integrationType } });
    });
  } catch (e) {
    throw new Error(e);
  } finally {
    session.endSession();
    client.close();
  }
};
