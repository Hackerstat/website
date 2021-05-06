import { NextApiRequest, NextApiResponse } from 'next';
import Axios from 'axios';
import { HTTPCode } from '../../../utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      console.log(`dsfdsdfs
      dfs
      dsf
      sdf
      dsf
      sdf
      
      dsf
      sdf
      ds
      dsf
      dfs
      `);
      const URL = `https://gitlab.com/oauth/token`;
      const gitLabTokenInfo = await Axios.post(URL, {
        client_id: process.env.GITLAB_APP_ID,
        client_secret: process.env.GITLAB_SECRET_KEY,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
      });
      console.log(req.query.code);
      res.status(HTTPCode.OK).json({});
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send(e);
    }
  }
};
