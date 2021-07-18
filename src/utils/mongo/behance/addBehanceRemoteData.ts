import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, BEHANCEDATA } from '../constants';
import { BehanceWorkPiecesType } from '../../../types';

interface AddBehanceRemoteDataPropsType {
  behanceDataID: string;
  behanceData: BehanceWorkPiecesType;
}

export const addBehanceRemoteData = async ({
  behanceDataID,
  behanceData,
}: AddBehanceRemoteDataPropsType): Promise<void> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await client
    .db(HACKERSTAT)
    .collection(BEHANCEDATA)
    .updateOne({ id: behanceDataID }, { $set: { dribbblePieces: behanceData } });
};
