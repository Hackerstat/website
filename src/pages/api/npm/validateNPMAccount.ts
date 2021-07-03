import { NextApiRequest, NextApiResponse } from 'next';
import { checkNPMUsernameValidator } from '../../../utils/validation';
import { fetchGithubRepos } from '../../../utils/mongo';
import { validateNPMAccountScrape } from '../../../utils/thrdAPIs';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

/**
 * @name validateNPMAccount
 * @description The function validates if a user's NPM account is their's by checking the NPM user's github integration.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @param {string} username NPM Account Username
 * @returns {void} */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { username: npmUsername } = await checkNPMUsernameValidator(req.query);
      const { user: gitHubUsername } = await fetchGithubRepos(req, res);
      const isValidated = await validateNPMAccountScrape(npmUsername, gitHubUsername || '');
      res.status(HTTPCode.OK).json({ validated: isValidated });
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Header');
    }
  }
});
