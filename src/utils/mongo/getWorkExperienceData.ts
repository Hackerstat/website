import { WorkExperienceType } from '../utils';
import { MongoClient } from 'mongodb';
import { URI, HACKERSTAT, USERPROFILES } from './constants';

type GetWorkExperienceDataResponseType = Promise<Array<WorkExperienceType>>;

const userProfileProjection = {
  projection: {
    workExperience: 1,
  },
};
const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const getWorkExperienceData = async (username: string): GetWorkExperienceDataResponseType => {
  const client = await connectToClient();

  const { workExperience } = await client
    .db(HACKERSTAT)
    .collection(USERPROFILES)
    .findOne({ username }, userProfileProjection);

  return <GetWorkExperienceDataResponseType>workExperience;
};
