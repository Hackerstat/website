import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { IntegrationTypes } from '../../../types';

interface GetRemoteDribbbleUsernameResType {
  dribbbleUsername: string;
  id: any;
  isValidated: boolean;
}

export const getRemoteDribbbleUsername = async (username: string): Promise<null | GetRemoteDribbbleUsernameResType> => {
  try {
    const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const {
      integrations,
      integration_settings: {
        dribbble: { username: dribbbleUsername, id, isValidated },
      },
    } = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username });

    if (integrations.includes(IntegrationTypes.DRIBBBLE)) {
      return { dribbbleUsername, id, isValidated };
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
