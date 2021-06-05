import { NextApiRequest, NextApiResponse } from 'next';
import { addGitLabDataValidator } from '../../../utils/validation/validators';
import { HTTPCode } from '../../../utils/constants';
import auth0 from '../../../utils/auth';
import { addGitLabData } from '../../../utils/mongo';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { user } = await auth0.getSession(req, res);
      const { sub } = user;
      // TODO: ADD COLLECTION FOR GITHUB DATA INFO, Not in same document as MONGODB, use _id for github info collection.
      // console.log(req.body);
      const resData = await addGitLabDataValidator(req.body);
      await addGitLabData({ sub, gitLabData: resData });
      res.status(HTTPCode.OK).json(resData);
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Fail');
    }
  }
});
