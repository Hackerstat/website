const NPM_URL_COUNT = 'https://api.npmjs.org/downloads/range/last-month';
import { MongoClient } from 'mongodb';
import npmUserPackages from 'npm-user-packages';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSettings } from '../../../utils/getUserSettings';
import auth0 from '../../../utils/auth';

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

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { user } = await auth0.getSession(req);
    const { sub, name } = user;

    const { username } = await getUserSettings(req, 'npm');
    const packages = await retrievePackagesFromUser(username);
    const packageInfo = [];
    const returnResults = [];

    const packagePromises = [];
    const packageNames = [];

    if (!packages) {
      res.status(404).send('Could not get packages');
    }

    for (let i = 0; i <= Math.min(packages.length, MAX_COUNT); ++i) {
      if (!packages[i]) {
        console.log('Package', i, packages[i]);
        console.error('Package not there!');
        continue;
      }

      packageInfo.push(packages[i]);
      console.log(name);
      packageNames.push(packages[i].name);
      packagePromises.push(retrieveNPMInfo(packages[i].name));
    }

    const packageResults = await Promise.all(packagePromises);

    for (let i = 0; i <= Math.min(packageResults.length, MAX_COUNT); ++i) {
      returnResults.push({ ...packageInfo[i], lastMonthDownloads: packageResults[i] });
    }

    returnResults.pop();
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    await client
      .db('Atlas')
      .collection('userProfiles')
      .updateOne(
        { authID: sub },
        {
          $setOnInsert: { authID: sub, username: name },
          $set: {
            'integration_settings.npm.username': username,
            'integration_cache.npm.packages': packageNames,
          },
        },
        { useUnifiedTopology: true, upsert: true },
      );
    // perform actions on the collection object
    client.close();
    res.status(200).json(returnResults);
  } catch (e) {
    console.log(e);
    res.status(400).send('FAIL');
  }
});
