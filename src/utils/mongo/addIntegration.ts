import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES } from './constants';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const addIntegration = async ({ username, setObject, closeOnCompletion = true }) => {
  const client = await connectToClient();

  client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { username: username },
      {
        $setOnInsert: { username: username },
        $set: { setObject },
      },
      { upsert: true },
    );

  if (closeOnCompletion) {
    client.close();
  }

  return { client: !closeOnCompletion ? client : undefined };
};
