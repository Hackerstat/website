import { MongoClient } from 'mongodb';

import { URI, HACKERSTAT, USERPROFILES, GITLABDATA, GITLAB } from '../constants';
import { AddGitLabDataSchemaType } from '../../validation/schemas';
import { UserProfileType } from '../../utils';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const addGitLabData = async ({
  sub,
  gitLabData,
}: {
  sub: any;
  gitLabData: AddGitLabDataSchemaType;
}): Promise<void> => {
  const client = await connectToClient();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      const integrationType = GITLAB;

      const id = userProfile._id;

      const gitLabProfile = await client
        .db(HACKERSTAT)
        .collection(GITLABDATA)
        .updateOne({ userID: id }, { $set: { userID: id, ...gitLabData } }, { upsert: true });

      if (gitLabProfile.upsertedCount) {
        await client
          .db(HACKERSTAT)
          .collection(USERPROFILES)
          .updateOne(
            { authID: sub },
            {
              $addToSet: { integrations: integrationType },
              $set: { [`integration_settings.${integrationType}`]: { id: gitLabProfile.upsertedId._id } },
            },
            { upsert: true },
          );
      }
    });
  } catch (e) {
    session.endSession();
    client.close();
    throw new Error(e);
  } finally {
    session.endSession();
    client.close();
  }
};
