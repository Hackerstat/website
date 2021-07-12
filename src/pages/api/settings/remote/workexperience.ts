import { NextApiRequest, NextApiResponse } from 'next';
import { usernameRemoteQueryValidator } from '../../../../utils/validation';
import { handleRes, StatusTypes } from '../../../../utils';
import { getWorkExperienceData } from '../../../../utils/mongo';

/**
 * @name remoteRetrieveWorkExperience
 * @description This function retrieves any HackerStat user's list of work experiences.
 * @author @Cgunter1
 * @argument {string} username The HackerStat username to retrieve its work experience.
 * @returns {void}
 */
export default async function remoteRetrieveWorkExperience(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { username } = await usernameRemoteQueryValidator(req.query);
      const listOfWorkExperiences = await getWorkExperienceData(username);
      handleRes({ res, status: StatusTypes.OK, jsonData: { listOfWorkExperiences } });
    }
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
}
