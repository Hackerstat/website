import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';
import { URI, HACKERSTAT, USERPROFILES } from '../constants';
import { GetRemoteWakaTimeDataRes } from '../../../types';

const queryOptions = {
  projection: { integrations: 1, 'integration_settings.wakatime': 1 },
};

export const getRemoteWakaTimeData = async (req: NextApiRequest): Promise<GetRemoteWakaTimeDataRes> => {
  const { username } = req.query;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const wakaTimeInfo = <GetRemoteWakaTimeDataRes>(
    await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ username: username }, queryOptions)
  );
  client.close();
  return wakaTimeInfo;
};
