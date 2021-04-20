import { MongoClient } from 'mongodb';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

export const addIntegration = async ({ username, setObject, closeOnCompletion = true }) => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const npmInfo = await client.db('Atlas').collection('userProfiles').findOne({ username: username });

  client
    .db('Atlas')
    .collection('userProfiles')
    .updateOne(
      { username: username },
      {
        $setOnInsert: { username: username },
        $set: { setObject },
      },
      { useUnifiedTopology: true, upsert: true },
    );

  if (closeOnCompletion) {
    client.close();
  }

  return { client: !closeOnCompletion ? client : undefined };
};

// export const getUserInfo = () => {

// };

// export const getIntegrationInfo = () => {};
