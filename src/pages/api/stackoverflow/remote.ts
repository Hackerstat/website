import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes } from '../../../utils';
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
      const { username } = await usernameRemoteQueryValidator(req.body);
      const stackoverflowUsername = await getRemoteStackOverflowUsername(username);
      const stackOverFlowData = await fetchStackOverflowInfo(stackoverflowUsername);

      await addStackOverflowRemoteData(username, stackOverFlowData);

      handleRes({ res, status: StatusTypes.OK, jsonData: stackOverFlowData });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  } else {
    console.error('Wrong Header');
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
}
