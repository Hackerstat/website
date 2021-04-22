import { MongoClient } from 'mongodb';
import { IUserProfileData, RetrievedIUserProfileData } from './utils';
import { NextApiRequest } from 'next';
import auth0 from './auth';
import workexperience from '../pages/api/settings/workexperience';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// TODO: Limit projected values from mongoDB queries.

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

export const addIntegration = async ({ username, setObject, closeOnCompletion = true }) => {
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

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

export const updateInfo = async (req: NextApiRequest): Promise<void> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const { firstName, lastName, website, email, bio, school, location } = req.body;

  const userProfileData: Partial<IUserProfileData> = {};

  if (firstName) {
    userProfileData.firstName = firstName;
  }

  if (lastName) {
    userProfileData.lastName = lastName;
  }

  if (website) {
    userProfileData.website = website;
  }

  if (email) {
    userProfileData.email = email;
  }

  if (bio) {
    userProfileData.bio = bio;
  }

  if (school) {
    userProfileData.school = school;
  }

  if (location) {
    userProfileData.location = location;
  }

  const {} = req.body;

  const client = await MongoClient.connect(URI, { useNewUrlParser: true });

  await client
    .db('HackerStat')
    .collection('userProfiles')
    .updateOne(
      { authID: sub },
      { $setOnInsert: { authID: sub }, $set: { info: { ...userProfileData } } },
      { useUnifiedTopology: true, upsert: true },
    );
};

export const getInfo = async (req: NextApiRequest): Promise<RetrievedIUserProfileData> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;
  const client = await MongoClient.connect(URI, { useNewUrlParser: true });
  const userInfo = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
  client.close();

  if (userInfo.hasOwnProperty('info')) {
    return userInfo.info as RetrievedIUserProfileData;
  }
  return {};
};

export const updateExperience = async (req: NextApiRequest): Promise<void> => {
  const { user } = await auth0.getSession(req);
  const { sub } = user;

  const requestBody = req.body;
  const { i, ...workExperienceData } = requestBody;
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });

  const setString = `workExperience.${i}`;

  const workExperienceObj = {};

  workExperienceObj[setString] = workExperienceData;

  await client
    .db('HackerStat')
    .collection('userProfiles')
    .updateOne({ authID: sub }, { $set: workExperienceObj }, { useUnifiedTopology: true });

  client.close();
};
