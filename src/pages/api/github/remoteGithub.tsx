import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { remoteGithub } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { getUserSettings } from '../../../utils/getUserSettings';

const API_KEY = process.env.GITHUB_API_KEY;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const createQuery = (username) => {
  return `query {
          user(login: "${username}") {
            login
            followers {
              totalCount
            }
            repositories(first: 10){
    	        nodes {
                name
                description
                pushedAt
                forkCount
                stargazers {
                  totalCount
                }
                languages(first: 5) {
                  nodes {
                    name,
                    color
                  },
                  totalSize
                }
              }
            }
            contributionsCollection {
              startedAt,
              endedAt,
              hasAnyContributions,
              hasActivityInThePast,
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color,
                    contributionCount,
                    date
                  }
                }
              }
            }
          }
        }`;
};

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { username } = await getUserSettings(req, 'github');
    const resu = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `bearer ${API_KEY}` },
      body: JSON.stringify({
        query: createQuery(username),
      }),
    });

    const response = await resu.json();

    await remoteGithub(req, username, response);

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});
