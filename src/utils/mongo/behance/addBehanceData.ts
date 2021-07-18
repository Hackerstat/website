import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES, BEHANCEDATA } from '../constants';
import { AddBehancePiecesSchemaType, UserProfileType, IntegrationTypes } from '../../';

export const addBehanceData = async ({
  sub,
  behanceUsername,
  behanceWorkPieces,
  isValidated,
}: AddBehancePiecesSchemaType): Promise<void> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      const integrationType = IntegrationTypes.BEHANCE;

      const id = userProfile._id;

      const hackerStatDB = client.db(HACKERSTAT);

      const behanceProfile = await hackerStatDB
        .collection(BEHANCEDATA)
        .updateOne({ userID: id }, { $set: { userID: id, behanceWorkPieces } }, { upsert: true });

      // It checks if the Dribbble Integrations has been created on the HackerStat user's profile already.
      if (behanceProfile.upsertedCount) {
        await hackerStatDB.collection(USERPROFILES).updateOne(
          { authID: sub },
          {
            $addToSet: { integrations: integrationType },
            $set: {
              [`integration_settings.${integrationType}`]: {
                id: behanceProfile.upsertedId._id,
                username: behanceUsername,
                isValidated,
              },
            },
          },
          { upsert: true },
        );
        // It checks if the Dribbble Integrations has been created on the HackerStat user's profile already.
      }
      // If so, just update the username and isValidated properties.
      else {
        await hackerStatDB.collection(USERPROFILES).updateOne(
          { authID: sub },
          {
            $addToSet: { integrations: integrationType },
            $set: {
              [`integration_settings.${integrationType}`]: {
                username: behanceUsername,
                isValidated,
              },
            },
          },
          { upsert: true },
        );
      }
    });
    session.endSession();
  } catch (e) {
    console.error(e);
  }
  client.close();
};
