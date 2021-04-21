import { usernameCheckerAPI } from './../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function usernameChecker(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      //   const { newUsername } = req.query;

      //   if (!newUsername) {
      //     res.status(400).send('You need to provide a username');
      //     return;
      //   }

      //   const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      //   const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      //   const possibleUser = await client.db('Atlas').collection('userProfiles').findOne({ username: newUsername });

      const possibleUser = await usernameCheckerAPI(req);

      switch (possibleUser.m) {
        case 'true':
          res.status(200).json({ result: true });
          break;
        case 'false':
          res.status(200).json({ result: false });
          break;
        case 'You need to provide a username':
          res.status(400).send(possibleUser.m);
          break;
        default:
          console.error('Should not be possible to be here');
          break;
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('FAIL');
    }
  }
}
