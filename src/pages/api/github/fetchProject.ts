import { fetchGithubYML } from '../../../utils/thrdAPIs';
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const githubRes = await fetchGithubYML(req);
    res.status(HTTPCode.OK).json(githubRes);
  } catch (e) {
    res.status(HTTPCode.BAD_REQUEST).send(e);
  }
};
