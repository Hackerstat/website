import { NextApiRequest, NextApiResponse } from 'next';
import { addIntegrationInSettingsValidator } from './validation';
import { validateMediumAccountScrape } from './';
import { getUsername } from './mongo';

export const integrationValidator = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const { integrationType, settings } = await addIntegrationInSettingsValidator(req.body);
  const { username: hackerStatUsername } = await getUsername(req, res);
  switch (integrationType) {
    case 'medium':
      return await validateMediumAccountScrape(settings.username, hackerStatUsername);
    default:
      console.error('Invalid Integration');
  }
};
