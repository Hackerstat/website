import { MongoClient } from 'mongodb';
import { AddWakaTimeIntegrationProps } from '../utils';

import { URI, HACKERSTAT, USERPROFILES, WAKATIME } from './constants';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const addWakaTimeIntegration = async ({
  sub,
  wakaTimeCodingActivityURL,
  wakaTimeLanguageURL,
}: AddWakaTimeIntegrationProps): Promise<void> => {
  const client = await connectToClient();

  await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .updateOne(
      { authID: sub },
      {
        $setOnInsert: { authID: sub },
        $push: { integrations: WAKATIME },
        $set: { [`integration_settings.${WAKATIME}`]: { wakaTimeCodingActivityURL, wakaTimeLanguageURL } },
      },
      { upsert: true },
    );

  client.close();
};
