import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../utils/constants';
import { fetchGithubRepos } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { user } = await auth0.getSession(req);
    const { sub } = user;

    const gitHubAccountData = await fetchGithubRepos({ sub });

    res.status(HTTPCode.OK).json(gitHubAccountData || {});
  } else {
    res.status(HTTPCode.BAD_REQUEST).send('Bad Method');
  }
};
