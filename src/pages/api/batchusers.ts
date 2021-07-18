import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, HttpCodes } from '../../utils';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

/**
 * @name batchusers
 * @description It is a function that retrieves a random group of 20 HackerStat Users.
 * @author @LouisIV @Cgunter1
 * @returns {void}
 */
export default async function batchusers(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === HttpCodes.GET) {
      const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });

      const users = await client
        .db('HackerStat')
        .collection('userProfiles')
        .find({ username: { $exists: true } })
        .limit(20);
      const userInfo = await users.toArray();
      handleRes({ res, status: StatusTypes.OK, jsonData: { users: userInfo } });
    }
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
}
