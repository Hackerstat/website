import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      // const {
      //   query: { username },
      // } = req;
      const { user } = await auth0.getSession(req);
      const { sub } = user;

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      const npmInfo = await client.db('Atlas').collection('userProfiles').findOne({ authID: sub });
      if (npmInfo) {
        if (Object(npmInfo).hasOwnProperty('integration_cache')) {
          if (Object(npmInfo.integration_cache).hasOwnProperty('npm')) {
            res.status(200).json(npmInfo.integration_cache.npm);
            return;
          }
        }
      }

      console.log(npmInfo);
      // perform actions on the collection object
      client.close();
      res.status(200).json({});
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  }
});
