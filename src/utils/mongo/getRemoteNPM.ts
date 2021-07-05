import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const getRemoteNPM = async (
  req: NextApiRequest,
  res: NextApiResponse,
  username: string,
  packageNames: Array<string>,
): Promise<void> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { authID: sub },
      {
        $setOnInsert: { authID: sub, username: name },
        $set: {
          'integration_settings.npm.username': username,
          'integration_cache.npm.packages': packageNames,
        },
      },
      { upsert: true },
    );
  // perform actions on the collection object
  client.close();
};
