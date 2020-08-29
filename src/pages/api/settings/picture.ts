import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
import auth0 from '../../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req);
      const { sub } = user;
      const { newPicture } = req.body;

      if (!newPicture) {
        res.status(400).send('You need to provide a username');
        return;
      }

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      await client
        .db('Atlas')
        .collection('userProfiles')
        .updateOne(
          { authID: sub },
          {
            $setOnInsert: { authID: sub },
            $set: {
              picture: newPicture,
            },
          },
          { useUnifiedTopology: true, upsert: true },
        );
      client.close();
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  } else if (req.method === 'GET') {
    try {
      const { user } = await auth0.getSession(req);
      const { sub } = user;

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      const currentUser = await client.db('Atlas').collection('userProfiles').findOne({ authID: sub });

      res.status(200).json({ picture: currentUser?.picture || null });
      client.close();
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  }
});
