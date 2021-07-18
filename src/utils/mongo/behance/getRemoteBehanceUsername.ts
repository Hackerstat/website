import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { IntegrationTypes } from '../../../types';

interface getRemoteBehanceUsernameResType {
  behanceUsername: string;
  id: any;
  isValidated: boolean;
}

export const getRemoteBehanceUsername = async (username: string): Promise<null | getRemoteBehanceUsernameResType> => {
  try {
    const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const {
      integrations,
      integration_settings: {
        behance: { username: behanceUsername, id, isValidated },
      },
    } = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username });

    if (integrations.includes(IntegrationTypes.BEHANCE)) {
      return { behanceUsername, id, isValidated };
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
