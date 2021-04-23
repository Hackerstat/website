import { fetchGithubYML } from '../../../utils/thrdAPIs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const githubRes = await fetchGithubYML(req);
    res.status(200).json(githubRes);
  } catch (e) {
    res.status(400).send(e);
  }
};
