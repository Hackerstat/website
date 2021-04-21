import { setUsername, getUsername } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from '../../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req);
      const { sub } = user;
      const { newUsername } = req.body;

      if (!newUsername) {
        res.status(400).send('You need to provide a username');
        return;
      }

      if (await setUsername(newUsername, sub)) {
        res.status(200).json({ result: true });
      } else {
        res.status(200).json({ result: false });
      }

      // const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      // const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      // const possibleUser = await client.db('Atlas').collection('userProfiles').findOne({ username: newUsername });

      // if (!possibleUser) {
      //   await client
      //     .db('Atlas')
      //     .collection('userProfiles')
      //     .updateOne(
      //       { authID: sub },
      //       {
      //         $setOnInsert: { authID: sub },
      //         $set: {
      //           username: newUsername,
      //         },
      //       },
      //       { useUnifiedTopology: true, upsert: true },
      //     );
      //   res.status(200).json({ result: true });
      // } else {
      //   res.status(200).json({ result: false });
      // }
      // client.close();
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  } else if (req.method === 'GET') {
    try {
      const currentUser = await getUsername(req);
      res.status(200).json({ username: currentUser?.username || null });
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  }
});
