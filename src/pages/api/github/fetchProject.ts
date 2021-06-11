import { fetchGithubYML } from '../../../utils/thrdAPIs';
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../utils/constants';

/**
 * @name fetchProject
 * @author @Cgunter1
 * @description This function completes the GitHub OAuth process by using the retrieved code, GitHub OAuth keys, and access token to retrive the user's gitHub info (i.e. repos, followers).
 * @argument {string} code The code to retrieve the access code to retrieve info of a user's GitHub Profile.
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const githubRes = await fetchGithubYML(req);
    res.status(HTTPCode.OK).json(githubRes);
  } catch (e) {
    res.status(HTTPCode.BAD_REQUEST).send(e);
  }
};
