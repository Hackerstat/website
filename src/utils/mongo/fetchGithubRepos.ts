import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES, GITHUBDATA, GITHUB } from './constants';
import { AddGitHubDataType } from '../validation/schemas';
import { UserProfileType } from '../utils';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const fetchGithubRepos = async ({ sub }: { sub: any }): Promise<null | AddGitHubDataType> => {
  const client = await connectToClient();

  const session = client.startSession();

  let returnValue = null;

  const integrationType = GITHUB;

  try {
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      // Returns null if userProfile does not have github integration.
      if (
        !Object(userProfile).hasOwnProperty('integrations') ||
        !Object(userProfile).hasOwnProperty('integration_settings')
      ) {
        return;
      }
      if (
        !userProfile.integrations.includes(integrationType) ||
        !Object(userProfile.integration_settings).hasOwnProperty(integrationType)
      ) {
        return;
      }

      const gitID = userProfile.integration_settings[integrationType].id;

      const gitHubData = await client.db(HACKERSTAT).collection(GITHUBDATA).findOne({ _id: gitID });

      returnValue = gitHubData;
    });
  } catch (e) {
    client.close();
  } finally {
    session.endSession();
    client.close();
    return returnValue;
  }
};
