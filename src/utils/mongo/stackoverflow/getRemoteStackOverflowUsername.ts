import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES, STACKOVERFLOW } from '../constants';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userProfileOptions = {
  projection: {
    integrations: 1,
    'integration_settings.stackoverflow.username': 1,
  },
};

export const getRemoteStackOverflowUsername = async (username: string): Promise<string | null> => {
  const client = await connectToClient();

  const {
    integrations: integrations,
    integration_settings: {
      stackoverflow: { username: stackoverflowUsername },
    },
  } = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: username }, userProfileOptions);

  if (!integrations.includes(STACKOVERFLOW)) {
    return null;
  } else {
    return stackoverflowUsername as string;
  }
};
