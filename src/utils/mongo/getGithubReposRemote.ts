import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES, GITHUBDATA } from './constants';
import { AddGitHubDataType } from '../validation/schemas';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userProfileOptions = {
  projection: { 'integration_settings.github.id': 1 },
};

const gitHubOptions = {
  projection: { followers: 1, following: 1, repos: 1, user: 1, avatar_url: 1 },
};

export const getGithubReposRemote = async (username: string): Promise<null | AddGitHubDataType> => {
  const client = await connectToClient();
  const session = client.startSession();
  let returnValue = null;

  try {
    await session.withTransaction(async () => {
      const {
        integration_settings: {
          github: { id: gitHubID },
        },
      } = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: username }, userProfileOptions);
      // Returns null if userProfile does not have github integration.
      if (!gitHubID) {
        return;
      }

      const gitHubData = await client.db(HACKERSTAT).collection(GITHUBDATA).findOne({ _id: gitHubID }, gitHubOptions);

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
