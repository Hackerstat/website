import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGithubRepos } from '../../../utils/mongo';
import { handleRes } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name fetchRepos
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @description This function retrieves a user's own GitHub Repos.
 * @returns {void} */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === HttpCodes.GET) {
    const gitHubAccountData = await fetchGithubRepos(req, res);
    handleRes({ res, status: StatusTypes.OK, jsonData: gitHubAccountData || {} });
  } else {
    handleRes({ res, status: StatusTypes.OK, message: 'Bad Method' });
  }
};
