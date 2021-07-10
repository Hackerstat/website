import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES, STACKOVERFLOWDATA } from '../constants';
import { FetchStackOverflowInfoRes } from '../../utils';

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userProfileOptions = {
  projection: {
    integrations: 1,
    _id: 1,
  },
};

export const addStackOverflowRemoteData = async (
  username: string,
  stackOverflowData: FetchStackOverflowInfoRes,
): Promise<void> => {
  const client = await connectToClient();

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const { _id } = await client
        .db(HACKERSTAT)
        .collection(USERPROFILES)
        .findOne({ username: username }, userProfileOptions);

      await client
        .db(HACKERSTAT)
        .collection(STACKOVERFLOWDATA)
        .updateOne({ userID: _id }, { $set: { userID: _id, ...stackOverflowData } }, { upsert: true });
    });
  } catch (e) {
    client.close();
    throw new Error(e);
  } finally {
    session.endSession();
    client.close();
  }
};
