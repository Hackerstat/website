import { NextApiRequest, NextApiResponse } from 'next';
import { usernameRemoteQueryValidator } from '../../../../utils/validation';
import { HTTPCode } from '../../../../utils/constants';
import { getWorkExperienceData } from '../../../../utils/mongo';

/**
 * @name remoteRetrieveWorkExperience
 * @description This function retrieves any HackerStat user's list of work experiences.
 * @author @Cgunter1
 * @argument {string} username The HackerStat username to retrieve its work experience.
 * @returns {void} */
export default async function remoteRetrieveWorkExperience(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
