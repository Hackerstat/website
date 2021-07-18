import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGithubRepos } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import { handleRes, StatusTypes, HttpCodes, validateNPMAccountScrape, checkNPMUsernameValidator } from '../../../utils';

/**
 * @name validateNPMAccount
 * @description The function validates if a user's NPM account is their's by checking the NPM user's github integration.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @param {string} username NPM Account Username
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const { username: npmUsername } = await checkNPMUsernameValidator(req.query);
      const { user: gitHubUsername } = await fetchGithubRepos(req, res);
      const isValidated = await validateNPMAccountScrape(npmUsername, gitHubUsername || '');
      handleRes({
        res,
        status: isValidated ? StatusTypes.OK : StatusTypes.NOT_FOUND,
        jsonData: { validated: isValidated },
      });
    } catch (e) {
      console.error(e);
      const message = 'Bad Header';
      handleRes({ res, status: StatusTypes.OK, message });
    }
  }
});
