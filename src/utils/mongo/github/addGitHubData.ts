import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES, GITHUBDATA } from '../constants';
import { AddGitHubDataType } from '../../validation/schemas';
import { UserProfileType, IntegrationTypes } from '../..';

interface AddGitHubDataProps {
  sub: any;
  gitHubData: AddGitHubDataType;
}

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const addGitHubData = async ({ sub, gitHubData }: AddGitHubDataProps): Promise<void> => {
  const client = await connectToClient();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      const integrationType = IntegrationTypes.GITHUB;

      const id = userProfile._id;

      const gitHubProfile = await client
        .db(HACKERSTAT)
        .collection(GITHUBDATA)
        .updateOne({ userID: id }, { $set: { userID: id, ...gitHubData } }, { upsert: true });

      if (gitHubProfile.upsertedCount) {
        await client
          .db(HACKERSTAT)
          .collection(USERPROFILES)
          .updateOne(
            { authID: sub },
            {
              $addToSet: { integrations: integrationType },
              $set: { [`integration_settings.${integrationType}`]: { id: gitHubProfile.upsertedId._id } },
            },
            { upsert: true },
          );
      }
    });
  } catch (e) {
    client.close();
    throw new Error(e);
  } finally {
    session.endSession();
    client.close();
  }
};
