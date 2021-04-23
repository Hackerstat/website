import { MongoClient } from 'mongodb';
import {
  IUserProfileData,
  RetrievedIUserProfileData,
  UserProfileType,
  DeleteExperienceParams,
  WorkExperienceType,
} from './utils';
import { NextApiRequest } from 'next';
import auth0 from './auth';

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// TODO: Limit projected values from mongoDB queries.

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;

const connectToClient = async () => await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// export const addIntegration = async ({ username, setObject, closeOnCompletion = true }) => {
//   const client = await connectToClient();

//   client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { username: username },
//       {
//         $setOnInsert: { username: username },
//         $set: { setObject },
//       },
//       { upsert: true },
//     );

//   if (closeOnCompletion) {
//     client.close();
//   }

//   return { client: !closeOnCompletion ? client : undefined };
// };

// export const getUserInfo = async (): Promise<any> => {
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });

//   const users = client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .find({ username: { $exists: true } })
//     .limit(20);

//   return users;
// };

// export const getIntegrationInfo = async (username: string | Array<string>): Promise<UserProfileType> => {
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const userInfo = <UserProfileType>(
//     await client.db('HackerStat').collection('userProfiles').findOne({ username: username })
//   );
//   client.close();
//   return userInfo;
// };

// export const getIntegrationInfoViaSub = async (req: NextApiRequest): Promise<UserProfileType> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const client = await MongoClient.connect(RUI, { useNewUrlParser: true });
//   const userInfo = <UserProfileType>await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });

//   return userInfo;
// };

// export const setUsername = async (newUsername: string, sub: any): Promise<boolean> => {
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });

//   const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ username: newUsername });

//   if (!possibleUser) {
//     await client
//       .db('HackerStat')
//       .collection('userProfiles')
//       .updateOne(
//         { authID: sub },
//         {
//           $setOnInsert: { authID: sub },
//           $set: {
//             username: newUsername,
//           },
//         },
//         { upsert: true },
//       );
//     client.close();
//     return true;
//   } else {
//     client.close();
//     return false;
//   }
// };

// export const getUsername = async (req: NextApiRequest): Promise<any> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const currentUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();
//   return currentUser;
// };

// export const usernameCheckerAPI = async (req: NextApiRequest): Promise<{ s: number; m: string }> => {
//   const { newUsername } = req.query;

//   if (!newUsername) {
//     return { s: 400, m: 'You need to provide a username' };
//   }

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });

//   const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ username: newUsername });

//   client.close();

//   return !possibleUser ? { s: 200, m: 'true' } : { s: 200, m: 'false' };
// };

// export const getIntegrationUserName = async (req: NextApiRequest, integrationOption: string): Promise<string> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const possibleUser = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();
//   if (Object(possibleUser).hasOwnProperty('integration_settings')) {
//     if (Object(possibleUser.integration_settings).hasOwnProperty(integrationOption)) {
//       return possibleUser.integration_settings[integrationOption].username;
//     }
//   }
//   return '';
// };

// export const updateInfo = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const { firstName, lastName, website, email, bio, school, location } = req.body;

//   const userProfileData: Partial<IUserProfileData> = {};

//   if (firstName) {
//     userProfileData.firstName = firstName;
//   }

//   if (lastName) {
//     userProfileData.lastName = lastName;
//   }

//   if (website) {
//     userProfileData.website = website;
//   }

//   if (email) {
//     userProfileData.email = email;
//   }

//   if (bio) {
//     userProfileData.bio = bio;
//   }

//   if (school) {
//     userProfileData.school = school;
//   }

//   if (location) {
//     userProfileData.location = location;
//   }

//   const {} = req.body;

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });

//   await client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { authID: sub },
//       { $setOnInsert: { authID: sub }, $set: { info: { ...userProfileData } } },
//       { upsert: true },
//     );
// };

// export const getInfo = async (req: NextApiRequest): Promise<RetrievedIUserProfileData> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const userInfo = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();

//   if (userInfo.hasOwnProperty('info')) {
//     return userInfo.info as RetrievedIUserProfileData;
//   }
//   return {};
// };

// export const updateExperience = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const requestBody = req.body;
//   const { i, ...workExperienceData } = requestBody;

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });

//   const setString = `workExperience.${i}`;

//   const workExperienceObj = {};

//   workExperienceObj[setString] = workExperienceData;

//   await client.db('HackerStat').collection('userProfiles').updateOne({ authID: sub }, { $set: workExperienceObj });

//   client.close();
// };

// export const deleteExperience = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const requestQuery = <DeleteExperienceParams>req.query;
//   const { i, ...workExperienceData } = requestQuery;

//   const index = parseInt(i);

//   const client = await connectToClient();

//   const session = client.startSession();

//   const setString = `workExperience.${i}`;

//   const workExperienceObj = {};

//   workExperienceObj[setString] = workExperienceData;

//   try {
//     // Making sure that removing a workExperience item is automic.
//     await session.withTransaction(async () => {
//       const userProfile = <UserProfileType>(
//         await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub })
//       );

//       userProfile.workExperience.splice(index, 1);

//       await client
//         .db('HackerStat')
//         .collection('userProfiles')
//         .updateOne({ authID: sub }, { $set: { workExperience: userProfile.workExperience } });
//     });
//   } catch (err) {
//     throw new Error(err);
//   } finally {
//     session.endSession();
//     client.close();
//   }
// };

// export const retrieveWorkExperience = async (req: NextApiRequest): Promise<Array<WorkExperienceType>> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const userData = <UserProfileType>await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   client.close();

//   return userData.workExperience;
// };

// export const addWorkExperience = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const workExperienceData = <WorkExperienceType>req.body;

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });

//   await client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { authID: sub },
//       { $setOnInsert: { authID: sub }, $push: { workExperience: workExperienceData } },
//       { upsert: true },
//     );
//   client.close();
// };

// export const addIntegrationInSettings = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub, name } = user;

//   // TODO: ADD VALIDATION
//   const { integrationType, settings } = req.body;

//   if (!integrationType) {
//     throw new Error('No integration type provided');
//   }

//   if (!settings) {
//     throw new Error('No settings object provided');
//   }

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   await client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { authID: sub },
//       {
//         $setOnInsert: { authID: sub, username: name },
//         $set: { [`integration_settings.${integrationType}`]: settings },
//         $addToSet: { integrations: integrationType },
//       },
//       { upsert: true },
//     );
//   client.close();
// };

// export const getUser = async (req: NextApiRequest): Promise<UserProfileType> => {
//   const { user } = req.query;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   const userData = <UserProfileType>(
//     await client.db('HackerStat').collection('userProfiles').findOne({ username: user })
//   );

//   return userData;
// };

// export const getRemoteNPM = async (
//   req: NextApiRequest,
//   username: string,
//   packageNames: Array<string>,
// ): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   await client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { authID: sub },
//       {
//         $setOnInsert: { authID: sub, username: name },
//         $set: {
//           'integration_settings.npm.username': username,
//           'integration_cache.npm.packages': packageNames,
//         },
//       },
//       { upsert: true },
//     );
//   // perform actions on the collection object
//   client.close();
// };

// export const getLocalNPM = async (req: NextApiRequest): Promise<any> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.m2hih.gcp.mongodb.net/Atlas?retryWrites=true&w=majority`;
//   const client = await MongoClient.connect(uri, { useNewUrlParser: true });
//   const npmInfo = await client.db('HackerStat').collection('userProfiles').findOne({ authID: sub });
//   if (npmInfo) {
//     if (Object(npmInfo).hasOwnProperty('integration_cache')) {
//       if (Object(npmInfo.integration_cache).hasOwnProperty('npm')) {
//         return npmInfo.integration_cache.npm;
//       }
//     }
//   }
//   // perform actions on the collection object
//   client.close();
//   return {};
// };

// export const removeIntegration = async (req: NextApiRequest): Promise<void> => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;

//   const { integrationType } = JSON.parse(req.body);

//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });

//   const session = client.startSession();

//   try {
//     // Making sure that removing a workExperience item is automic.
//     await session.withTransaction(async () => {
//       await client
//         .db('HackerStat')
//         .collection('userProfiles')
//         .updateOne(
//           { authID: sub },
//           { $unset: { [`integration_cache.${integrationType}`]: '', [`integration_settings.${integrationType}`]: '' } },
//         );

//       await client
//         .db('HackerStat')
//         .collection('userProfiles')
//         .updateOne({ authID: sub }, { $pull: { integrations: integrationType } });
//     });
//   } catch (e) {
//     throw new Error(e);
//   } finally {
//     session.endSession();
//     client.close();
//   }
// };

// export const remoteGithub = async (req: NextApiRequest, username: string, response: any) => {
//   const { user } = await auth0.getSession(req);
//   const { sub } = user;
//   const client = await MongoClient.connect(URI, { useNewUrlParser: true });
//   await client
//     .db('HackerStat')
//     .collection('userProfiles')
//     .updateOne(
//       { authID: sub },
//       {
//         $setOnInsert: { authID: sub, username: name },
//         $set: {
//           'integration_settings.github.username': username,
//           'integration_cache.github.repositories': response.data.user.repositories.nodes,
//         },
//       },
//       { upsert: true },
//     );
// };
