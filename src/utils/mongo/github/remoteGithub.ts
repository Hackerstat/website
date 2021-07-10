import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import auth0 from '../../auth';

export const remoteGithub = async (req: NextApiRequest, username: string, res: any): Promise<void> => {
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
          'integration_settings.github.username': username,
          'integration_cache.github.repositories': res.data.user.repositories.nodes,
        },
      },
      { upsert: true },
    );
};
