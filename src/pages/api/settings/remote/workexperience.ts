import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPCode } from '../../../../utils/constants';

export default async function RemoteRetrieveWorkExperience(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      res.status(HTTPCode.OK).json({});
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('SERVER ERROR');
  }
}
