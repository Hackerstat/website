import { NextApiRequest, NextApiResponse } from 'next';
import {
  handleRes,
  StatusTypes,
  usernameRemoteQueryValidator,
  retrieveBehanceAccountScrape,
  validateDribbbleAccountScrape,
  BehanceRemoteJSONDataType,
} from '../../../utils';
import { getRemoteBehanceUsername, addBehanceRemoteData } from '../../../utils/mongo';

/**
 * @name remoteBehance
 * @description It is the function that will retrieve the HackerStat User's Behance information w/out authentication.
 * @author @Cgunter1
 * @argument {string} username It is the HackerStat user's username that the function will retrieve the Behance Info on behalf of.
 * @returns {void}
 */
export default async function remoteDribble(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { username: hackerStatUsername } = await usernameRemoteQueryValidator(req.body);
      const { behanceUsername, id: behanceDataID } = await getRemoteBehanceUsername(hackerStatUsername);
      const behanceData = await retrieveBehanceAccountScrape(behanceUsername);

      await addBehanceRemoteData({ behanceDataID, behanceData });
      const isValidated = await validateDribbbleAccountScrape(behanceUsername, hackerStatUsername);

      const remoteBehanceRes: BehanceRemoteJSONDataType = { behanceData, behanceUsername, isValidated };

      handleRes({ res, status: StatusTypes.OK, jsonData: remoteBehanceRes });
    } catch (e) {
      console.error(e);
    }
  } else {
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
}
