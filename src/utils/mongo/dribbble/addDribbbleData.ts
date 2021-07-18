import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { DRIBBBLEDATA } from '../constants';
import { IntegrationTypes } from '../../../types';
import { AddDribbblePiecesType } from '../..';
import { UserProfileType } from '../types';

export const addDribbbleData = async ({
  sub,
  dribbbleUsername,
  dribbblePieces,
  isValidated,
}: AddDribbblePiecesType): Promise<void> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const userProfile = <UserProfileType>(
        await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub })
      );

      const integrationType = IntegrationTypes.DRIBBBLE;

      const id = userProfile._id;

      const hackerStatDB = client.db(HACKERSTAT);

      const dribbbleProfile = await hackerStatDB
        .collection(DRIBBBLEDATA)
        .updateOne({ userID: id }, { $set: { userID: id, dribbblePieces } }, { upsert: true });

      // It checks if the Dribbble Integrations has been created on the HackerStat user's profile already.
      if (dribbbleProfile.upsertedCount) {
        await hackerStatDB.collection(USERPROFILES).updateOne(
          { authID: sub },
          {
            $addToSet: { integrations: integrationType },
            $set: {
              [`integration_settings.${integrationType}`]: {
                id: dribbbleProfile.upsertedId._id,
                username: dribbbleUsername,
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
                username: dribbbleUsername,
                isValidated,
              },
            },
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
