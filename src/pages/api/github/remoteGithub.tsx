import { NextApiRequest, NextApiResponse } from 'next';
import { getGithubReposRemote } from '../../../utils/mongo';
import { HTTPCode } from '../../../utils/constants';

const API_KEY = process.env.GITHUB_API_KEY;

const createQuery = (username: string) => {
  return `query {
          user(login: "${username}") {
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

export default async function remoteGitHubRetrieval(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { username } = req.query;

      const gitHubInfo = await getGithubReposRemote(username as string);

      const resu = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `bearer ${API_KEY}` },
        body: JSON.stringify({
          query: createQuery(gitHubInfo.user),
        }),
      });

      const response = await resu.json();

      res.status(HTTPCode.OK).json({ ...response, ...gitHubInfo });
      return;
    }
    res.status(HTTPCode.OK).send('OK');
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
}
