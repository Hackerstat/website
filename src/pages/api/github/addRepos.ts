import { NextApiRequest, NextApiResponse } from 'next';
import { addGitHubDataValidator } from '../../../utils/validation/validators';
import { HTTPCode } from '../../../utils/constants';
import auth0 from '../../../utils/auth';

export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      // TODO: ADD COLLECTION FOR GITHUB DATA INFO, Not in same document as MONGODB, use _id for github info collection.
      const resData = await addGitHubDataValidator(req.body);
      console.log(resData);
      res.status(HTTPCode.OK).json(resData);
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send('Fail');
    }
  }
});
