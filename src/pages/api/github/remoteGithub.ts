import { NextApiRequest, NextApiResponse } from 'next';
import { getGithubReposRemote } from '../../../utils/mongo';
import { usernameRemoteQueryValidator } from '../../../utils/validation';
import { handleRes, StatusTypes } from '../../../utils';

const API_KEY = process.env.GITHUB_API_KEY;

/**
 * @name createQuery
 * @author @Cgunter1
 * @description This function constructs the GraphQL query to GitHub to retrieve a user's contributions.
 * @param {string} username The GitHub username used for the GraphQL query.
 * @returns {string}
 */
const createQuery = (username: string): string => {
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

/**
 * @name remoteGitHubRetrieval
 * @author @Cgunter1
 * @description This function retrieves a user's GitHub Repos and contributions without authentication. This API call is used only for a user's public profile.
 * @param {string} username This is the GitHub username used to retrieve its GitHub Repos and contributions.
 * @returns {void} */
export default async function remoteGitHubRetrieval(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { username } = await usernameRemoteQueryValidator(req.query);

      const gitHubInfo = await getGithubReposRemote(username as string);

      const resu = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `bearer ${API_KEY}` },
        body: JSON.stringify({
          query: createQuery(gitHubInfo.user),
        }),
      });

      const response = await resu.json();

      handleRes({ res, status: StatusTypes.OK, jsonData: { ...response, ...gitHubInfo } });
      return;
    }
    handleRes({ res, status: StatusTypes.OK });
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
}
