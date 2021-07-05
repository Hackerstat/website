import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from './constants';
import auth0 from '../auth';

export const getIntegrationUserName = async (
  req: NextApiRequest,
  res: NextApiResponse,
  integrationOption: string,
): Promise<string> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const possibleUser = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  client.close();
  if (Object(possibleUser).hasOwnProperty('integration_settings')) {
    if (Object(possibleUser.integration_settings).hasOwnProperty(integrationOption)) {
      return possibleUser.integration_settings[integrationOption].username;
    }
  }
  return '';
};
