const NPM_URL_COUNT = 'https://api.npmjs.org/downloads/range/last-month';
import { MongoClient } from 'mongodb';
import npmUserPackages from 'npm-user-packages';
import { NextApiRequest, NextApiResponse } from 'next';

const MAX_COUNT = 10;

const retrieveNPMInfo = async (packageName: string) => {
  const res = await fetch(`${NPM_URL_COUNT}/${packageName}`);
  return await res.json();
};

const retrievePackagesFromUser = async (userName: string | string[]) => {
  const res = await npmUserPackages(userName);
  return res;
};

// Do server side rendering for the first request.

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { npmUsername, username },
  } = req;

  try {
    const packages = await retrievePackagesFromUser(npmUsername);
    const packageInfo = [];
    const returnResults = [];

    const packagePromises = [];
    const packageNames = [];

    for (let i = 0; i <= packages.length && i <= MAX_COUNT; ++i) {
      packageInfo.push(packages[i]);
      packageNames.push(packages[i].name);
      packagePromises.push(retrieveNPMInfo(packages[i]['name']));
    }

    const packageResults = await Promise.all(packagePromises);

    for (let i = 0; i <= packageResults.length || i <= MAX_COUNT; ++i) {
      returnResults.push({ ...packageInfo[i], lastMonthDownloads: packageResults[i] });
    }
    console.log(packageNames[0]);
    returnResults.pop();
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    await client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { username: username },
        { $setOnInsert: { username: username }, $set: { npmUsername: npmUsername, packages: packageNames } },
        { useUnifiedTopology: true, upsert: true },
      );
    // perform actions on the collection object
    client.close();
    res.status(200).json(JSON.stringify(returnResults));
  } catch (e) {
    console.log(e);
    res.status(400).send('FAIL');
  }
};
