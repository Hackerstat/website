import { NextApiRequest, NextApiResponse } from 'next';
import { usernameRemoteQueryValidator } from '../../../../utils/validation';
import { HTTPCode } from '../../../../utils/constants';
import { getWorkExperienceData } from '../../../../utils/mongo';

export default async function RemoteRetrieveWorkExperience(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { username } = await usernameRemoteQueryValidator(req.query);
      const listOfWorkExperiences = await getWorkExperienceData(username);
      res.status(HTTPCode.OK).json({ listOfWorkExperiences });
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('SERVER ERROR');
  }
}
