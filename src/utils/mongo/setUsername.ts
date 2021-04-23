import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES } from './constants';

export const setUsername = async (newUsername: string, sub: any): Promise<boolean> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const possibleUser = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: newUsername });

  if (!possibleUser) {
    await client
      .db(HACKERSTAT)
      .collection(USERPROFILES)
      .updateOne(
        { authID: sub },
        {
          $setOnInsert: { authID: sub },
          $set: {
            username: newUsername,
          },
        },
        { upsert: true },
      );
    client.close();
    return true;
  } else {
    client.close();
    return false;
  }
};
