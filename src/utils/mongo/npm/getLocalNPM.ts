import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { URI, HACKERSTAT, USERPROFILES, INTEGRATION_CACHE, NPM } from '../constants';
import auth0 from '../../auth';

export const getLocalNPM = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { user } = await auth0.getSession(req, res);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const npmInfo = await client.db(HACKERSTAT).collection(USERPROFILES).findOne({ authID: sub });
  if (npmInfo) {
    if (Object(npmInfo).hasOwnProperty(INTEGRATION_CACHE)) {
      if (Object(npmInfo.integration_cache).hasOwnProperty(NPM)) {
        return npmInfo.integration_cache.npm;
      }
    }
  }
  // perform actions on the collection object
  client.close();
  return {};
};
