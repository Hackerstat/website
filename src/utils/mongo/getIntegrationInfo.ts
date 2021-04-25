import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES } from './constants';

import { UserProfileType } from '../utils';

export const getIntegrationInfo = async (username: string | Array<string>): Promise<UserProfileType> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = <UserProfileType>(
    await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: username })
  );
  client.close();
  return userInfo;
};
