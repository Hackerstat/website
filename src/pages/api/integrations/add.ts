import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationInfo } from '../../../utils/mongo';
import { mediumUserNameQueryValidator } from '../../../utils/validation';
import { handleRes } from '../../../utils';
import { StatusTypes } from '../../../types';

/**
 * @REMOVE
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    try {
      await mediumUserNameQueryValidator(req.query);
    } catch ({ message }) {
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
      return;
    }

    const {
      query: { username },
    } = req;

    const npmInfo = await getIntegrationInfo(username);
    // perform actions on the collection object
    handleRes({ res, status: StatusTypes.BAD_REQUEST, jsonData: npmInfo });
  } catch (e) {
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
};
