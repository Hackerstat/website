const NPM_URL_COUNT = 'https://api.npmjs.org/downloads/range/last-month';
import { MongoClient } from 'mongodb';
import npmUserPackages from 'npm-user-packages';

const MAX_COUNT = 10;

const retrieveNPMInfo = async (packageName: string) => {
  const res = await fetch(`${NPM_URL_COUNT}/${packageName}`);
  return await res.json();
};

const retrievePackagesFromUser = async (userName: string) => {
  const res = await npmUserPackages(userName);
  return res;
};

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

export default async (req, res) => {
  const {
    query: { username },
  } = req;
  try {
    const packages = await retrievePackagesFromUser(username);
    const packageInfo = [];
    const returnResults = [];

    const packagePromises = [];

    for (let i = 0; i <= packages.length && i <= MAX_COUNT; ++i) {
      packageInfo.push(packages[i]);
      packagePromises.push(retrieveNPMInfo(packages[i]['name']));
    }

    const packageResults = await Promise.all(packagePromises);

    for (let i = 0; i <= packageResults.length || i <= MAX_COUNT; ++i) {
      returnResults.push({ ...packageInfo[i], lastMonthDownloads: packageResults[i] });
    }

    returnResults.pop();
    res.status(200).json(JSON.stringify(returnResults));
  } catch (e) {
    console.log(e);
    res.status(400).send('FAIL');
  }
};

/*
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    client
      .db('Atlas')
      .collection('userProfiles')
      .find({ firstName: 'Chris', lastName: 'Gunter' })
      .toArray((err, result) => {
        console.log(result);
      });
    // perform actions on the collection object
    client.close();
    res.status(200).send('OK');
  });
*/
