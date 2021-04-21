import { MongoClient } from 'mongodb';
import userinfo from '../pages/api/userinfo';
import { NextApiRequest } from 'next';
import auth0 from './auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

export const addIntegration = async ({ username, setObject, closeOnCompletion = true }) => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const npmInfo = await client.db('HackerStat').collection('userProfiles').findOne({ username: username });

  client
    .db('HackerStat')
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

export const getUserInfo = async (): Promise<any> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const users = client
    .db('HackerStat')
    .collection('userProfiles')
    .find({ username: { $exists: true } })
    .limit(20);

  return users;
};

export const getIntegrationInfo = async (integrationName: string, username: string | Array<string>) => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = await client.db('HackerStat').collection('userProfiles').findOne({ username: username });

  client.close();
  console.log(userInfo);
};

export const setUsername = async (newUsername: string, sub: any): Promise<boolean> => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ username: newUsername });

  if (!possibleUser) {
    await client
      .db('HackerStat')
      .collection('userProfiles')
      .updateOne(
        { authID: sub },
        {
          $setOnInsert: { authID: sub },
          $set: {
            username: newUsername,
          },
        },
        { useUnifiedTopology: true, upsert: true },
      );
    client.close();
    return true;
  } else {
    client.close();
    return false;
  }
};

export const getUsername = async (req: NextApiRequest): Promise<any> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const currentUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
  client.close();
  return currentUser;
};

export const usernameCheckerAPI = async (req: NextApiRequest): Promise<{ s: number; m: string }> => {
  const { newUsername } = req.query;

  if (!newUsername) {
    return { s: 400, m: 'You need to provide a username' };
  }

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ username: newUsername });

  client.close();

  return !possibleUser ? { s: 200, m: 'true' } : { s: 200, m: 'false' };
};

export const getIntegrationUserName = async (req: NextApiRequest, integrationOption: string): Promise<string> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
  client.close();
  if (Object(possibleUser).hasOwnProperty('integration_settings')) {
    if (Object(possibleUser.integration_settings).hasOwnProperty(integrationOption)) {
      return possibleUser.integration_settings[integrationOption].username;
    }
  }
  return '';
};

// export const getNPM = async (req: NextApiRequest): Promise<string> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();
//   if (Object(possibleUser).hasOwnProperty('integration_settings')) {
//     if (Object(possibleUser.integration_settings).hasOwnProperty('npm')) {
//       return possibleUser.integration_settings.npm.username;
//     }
//   }
//   return '';
// };

// export const getTwitter = async (req: NextApiRequest): Promise<string> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();
//   if (Object(possibleUser).hasOwnProperty('integration_settings')) {
//     if (Object(possibleUser.integration_settings).hasOwnProperty('twitter')) {
//       return possibleUser.integration_settings.twitter.username;
//     }
//   }
//   return '';
// };
