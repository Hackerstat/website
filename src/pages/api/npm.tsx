const NPM_URL_COUNT = 'https://api.npmjs.org/downloads/range/last-month';
import { MongoClient } from 'mongodb';

// const retrieveNPMInfo = async (packageName: string) => {
//   const res = await fetch(`${NPM_URL_COUNT}/${packageName}`);
//   return await res.json();
// };

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

export default async (req, res) => {
  try {
    console.log(await retrieveNPMInfo('jquery'));
    res.status(200).send('OK');
  } catch (e) {
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
