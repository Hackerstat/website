import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, HttpCodes, addGitLabDataValidator } from '../../../utils';
import auth0 from '../../../utils/auth';
import { addGitLabData } from '../../../utils/mongo';

/**
 * @name addRepos
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @description This function retrieves a user's own GitLab Repos.
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.POST) {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      const jsonData = await addGitLabDataValidator(req.body);
      await addGitLabData({ sub, gitLabData: jsonData });
      handleRes({ res, status: StatusTypes.OK, jsonData });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});
