import { NextApiRequest, NextApiResponse } from 'next';
import Axios from 'axios';
import { HTTPCode } from '../../../utils/constants';
import { GitHubRepoDataType } from '../../../utils/utils';

/**
 * @name queryParser
 * @author @Cgunter1
 * @description Utility function to splice the query retrieved from the GitHub OAuth response.
 * @param {string} query The url query to be spliced.
 * @returns {Object} Object key and values of the parsed query.
 */
const queryParser = (query: string) => {
  const queryParts = query.split('&');
  const queryObject = {};
  queryParts.forEach((qr: string) => {
    const qrKeyAndValue = qr.split('=');
    queryObject[qrKeyAndValue[0]] = qrKeyAndValue[1];
  });
  return queryObject;
};

/**
 * @name addVerification
 * @author @Cgunter1
 * @description This function completes the GitHub OAuth process by using the retrieved code, GitHub OAuth keys, and access token to retrive the user's gitHub info (i.e. repos, followers).
 * @argument {string} code The code to retrieve the access code to retrieve info of a user's GitHub Profile.
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if (!Object(req.query).hasOwnProperty('code')) {
      res.status(HTTPCode.BAD_REQUEST).send('No Access Code.');
      return;
    }
    const accessRes = await Axios.get('https://github.com/login/oauth/access_token', {
      params: {
        client_id: process.env.CLIENT_ID_GITHUB_OAUTH,
        client_secret: process.env.CLIENT_SECRET_GITHUB_OAUTH,
        code: req.query.code,
      },
    });

    const accessData = <{ access_token: string }>queryParser(accessRes.data);
    const userRes = await Axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessData.access_token}`,
      },
    });
    const { login, avatar_url, html_url, name, location, public_repos, followers, following, repos_url } = userRes.data;

    const reposRes = await Axios.get(repos_url, {
      headers: {
        Authorization: `token ${accessData.access_token}`,
      },
    });

    const reposPromises = reposRes.data.map(async (repo: GitHubRepoDataType) => ({
      repoName: repo.name,
      private: repo.private,
      owner: repo.owner.login,
      url: repo.html_url,
      des: repo.description || '',
      sz: repo.size,
      lastUpdated: repo.updated_at,
      stars: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks_count,
      languages: (
        await Axios.get(repo.languages_url, {
          headers: {
            Authorization: `token ${accessData.access_token}`,
          },
        })
      ).data,
      contributors: repo.contributors_url,
    }));

    const repos = await Promise.all(reposPromises);

    const gitHubAccountDump = {
      user: login,
      avatar_url,
      html_url,
      name,
      location,
      public_repos,
      followers,
      following,
      repos,
    };

    res.status(HTTPCode.OK).json(gitHubAccountDump);
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send(e);
  }
};
