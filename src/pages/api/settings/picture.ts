import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { handleRes } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HttpCodes.POST) {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      const { newPicture } = req.body;

      if (!newPicture) {
        const message = 'You need to provide a username';
        handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
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
          { upsert: true },
        );
      client.close();
    } catch ({ message }) {
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
    }
  } else if (req.method === HttpCodes.GET) {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;

      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      const currentUser = await client.db('Atlas').collection('userProfiles').findOne({ authID: sub });

      handleRes({ res, status: StatusTypes.OK, jsonData: { picture: currentUser?.picture || null } });
      client.close();
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  }
});
