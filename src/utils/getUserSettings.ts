import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from './auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const getUserSettings = async (req: NextApiRequest, res: NextApiResponse): Promise<string> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const { integrationType } = await JSON.parse(req.body);

  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  const integrationUsername = await client
    .db('Atlas')
    .collection('userProfiles')
    .findOne({ authID: sub }, { [`integration_settings.${integrationType}`]: 1 });

  return integrationUsername;
};
