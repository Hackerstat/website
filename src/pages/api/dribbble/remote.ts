import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes } from '../../../utils';
import { getRemoteDribbbleUsername, addDribbbleRemoteData } from '../../../utils/mongo';
import {
  retrieveDribbblePiecesScrape,
  usernameRemoteQueryValidator,
  validateDribbbleAccountScrape,
} from '../../../utils';

/**
 * @name remoteDribble
 * @description It is the function that will retrieve the HackerStat User's Dribbble information w/out authentication.
 * @author @Cgunter1
 * @argument {string} username It is the HackerStat user's username that the function will retrieve the Dribbble Info on behalf of.
 * @returns {void}
 */
export default async function remoteDribble(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { username: hackerStatUsername } = await usernameRemoteQueryValidator(req.body);
      const { dribbbleUsername, id: dribbbleDataID } = await getRemoteDribbbleUsername(hackerStatUsername);
      const dribbbleData = await retrieveDribbblePiecesScrape(dribbbleUsername);

      await addDribbbleRemoteData({ dribbbleDataID, dribbbleData });
      const isValidated = await validateDribbbleAccountScrape(dribbbleUsername, hackerStatUsername);

      handleRes({ res, status: StatusTypes.OK, jsonData: { dribbbleData, dribbbleUsername, isValidated } });
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  } else {
    console.error('Wrong Header');
    handleRes({ res, status: StatusTypes.BAD_REQUEST });
  }
}
