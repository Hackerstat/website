import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../utils/constants';
import { usernameRemoteQueryValidator } from '../../../utils/validation';
import { getRemoteStackOverflowUsername, addStackOverflowRemoteData } from '../../../utils/mongo';
import { fetchStackOverflowInfo } from '../../../utils/thrdAPIs';

/**
 * @name remoteStackOverflow
 * @description It is the function that will retrieve the HackerStat User's StackOverflow information w/out authentication of that user.
 * @author @Cgunter1
 * @argument {string} username It is the HackerStat user's username that the function will retrieve the StackOverflow Info on behalf of.
 * @returns {void}
 */
export default async function remoteStackOverflow(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      console.log(req.query);
      const { username } = await usernameRemoteQueryValidator(req.query);
      const stackoverflowUsername = await getRemoteStackOverflowUsername(username);
      const stackOverFlowData = await fetchStackOverflowInfo(stackoverflowUsername);

      await addStackOverflowRemoteData(username, stackOverFlowData);

      res.status(HTTPCode.OK).json(stackOverFlowData);
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.BAD_REQUEST).send('Bad Request');
    }
  } else {
    res.status(HTTPCode.BAD_REQUEST).send('Bad Request');
  }
}
