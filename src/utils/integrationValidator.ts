import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettingsValidator } from './validation';
import { validateMediumAccountScrape, validateStackOverflowAccountScrape, validateNPMAccountScrape } from './';
import { getUsername, fetchGithubRepos } from './mongo';

export const integrationValidator = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const { integrationType, settings } = await addIntegrationInSettingsValidator(req.body);
  const { username: hackerStatUsername } = await getUsername(req, res);
  switch (integrationType) {
    case 'medium':
      return await validateMediumAccountScrape(settings.username, hackerStatUsername);
    case 'stackoverflow':
      return await validateStackOverflowAccountScrape(settings.username, hackerStatUsername);
    case 'npm':
      const { user: gitHubUsername } = await fetchGithubRepos(req, res);
      return await validateNPMAccountScrape(settings.username, gitHubUsername);
    default:
      console.error('Invalid Integration');
  }
};
