import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, DRIBBBLEDATA } from '../constants';
import { RetrieveDribbblePiecesScrape } from '../..';

interface AddDribbbleRemoteDataPropsType {
  dribbbleDataID: string;
  dribbbleData: RetrieveDribbblePiecesScrape;
}

export const addDribbbleRemoteData = async ({
  dribbbleDataID,
  dribbbleData,
}: AddDribbbleRemoteDataPropsType): Promise<void> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await client
    .db(HACKERSTAT)
    .collection(DRIBBBLEDATA)
    .updateOne({ id: dribbbleDataID }, { $set: { dribbblePieces: dribbbleData } });
};
