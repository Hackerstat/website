import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from './auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const getUserSettings = async (
  req: NextApiRequest,
  integrationType: string,
): Promise<{ [key: string]: string }> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;
  console.log(sub);

  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  const integrationUsername = await client
    .db('HackerStat')
    .collection('userProfiles')
    .findOne({ authID: sub }, { [`integration_settings.${integrationType}`]: 1 });

  if (!Object(integrationUsername).hasOwnProperty('integration_settings')) {
    return { username: '' };
  }
  return integrationUsername.integration_settings[integrationType];
};
