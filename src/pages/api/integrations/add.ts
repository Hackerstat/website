import { NextApiRequest, NextApiResponse } from 'next';
import { getIntegrationInfo } from '../../../utils/mongo';
import { mediumUserNameQueryValidator } from '../../../utils/validation';
import { HTTPCode } from '../../../utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    try {
      await mediumUserNameQueryValidator(req.query);
    } catch ({ message }) {
      res.status(HTTPCode.BAD_REQUEST).send(message);
      return;
    }

    const {
      query: { username },
    } = req;

    const npmInfo = await getIntegrationInfo(username);
    // perform actions on the collection object
    res.status(HTTPCode.OK).json(JSON.stringify(npmInfo));
  } catch (e) {
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
};
