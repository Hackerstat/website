import { NextApiRequest, NextApiResponse } from 'next';
import { addGitHubDataValidator } from '../../../utils/validation/validators';
import auth0 from '../../../utils/auth';
import { addGitHubData } from '../../../utils/mongo';
import { handleRes } from '../../../utils';
import { StatusTypes, HttpCodes } from '../../../types';

/**
 * @name addRepos
 * @description Adds a user's authenticated GitHub repos to their HackerStat profile.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @argument {string} avatar_url The URL of a user's GitHub profile picture.
 * @argument {string} user The name of a user's GitHub username.
 * @argument {string} location The name of a user's location on their GitHub profile.
 * @argument {number} followers The # of followers on a user's GitHub profile.
 * @argument {number} following The # of GitHub users following a user's GitHub profile.
 * @argument {gitRepoSchema} repos A user's GitHub repos.
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.POST) {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      const jsonData = await addGitHubDataValidator(req.body);
      await addGitHubData({ sub, gitHubData: jsonData });
      handleRes({ res, status: StatusTypes.OK, jsonData });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});
