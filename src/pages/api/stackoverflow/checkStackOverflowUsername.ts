import { NextApiRequest, NextApiResponse } from 'next';
import { checkStackOverflowUsernameValidator } from '../../../utils/validation';
import { fetchStackOverflowInfo } from '../../../utils/thrdAPIs/fetchStackOverflow';
import auth0 from '../../../utils/auth';

/**
 * body: {
 *  soID: 214saa23
 * }
 */
export default auth0.requireAuthentication(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      await checkStackOverflowUsernameValidator(req.query);
      const stackOverflowData = await fetchStackOverflowInfo(req);
      res.status(200).json(stackOverflowData);
    } catch (e) {
      console.error(e);
      res.status(400).send('FAIL');
    }
  }
});