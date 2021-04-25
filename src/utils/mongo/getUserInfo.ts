import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES } from './constants';

export const getUserInfo = async (): Promise<any> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const users = client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .find({ username: { $exists: true } })
    .limit(20);

  return users;
};
