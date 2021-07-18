import { NextApiRequest, NextApiResponse } from 'next';
import { updateExperience, deleteExperience, retrieveWorkExperience, addWorkExperience } from '../../../utils/mongo';
import auth0 from '../../../utils/auth';
import {
  handleRes,
  StatusTypes,
  HttpCodes,
  addWorkExperienceValidator,
  updateWorkExperienceValidator,
} from '../../../utils';

/**
 * @name workexperience
 * @description This functions is CRUD for a HackerStat user's work experience.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @argument {addWorkExperienceSchema} addedWorkExperience It is the workExperience object being added to the HackerStat User's profile.
 * @argument {updateWorkExperienceSchema} updatedWorkExperience It is the workExperience object being updated or deleted on the HackerStat User's profile. The object should have an id to identify the specific work experience instance.
 * @returns {void} */
export default auth0.withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === HttpCodes.GET) {
    try {
      const workExperience = await retrieveWorkExperience(req, res);
      handleRes({ res, status: StatusTypes.OK, jsonData: { workExperience } });
    } catch (e) {
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
      return;
    }
  } else if (req.method === HttpCodes.POST) {
    try {
      await addWorkExperienceValidator(req.body);
      await addWorkExperience(req, res);
      handleRes({ res, status: StatusTypes.OK });
      return;
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
      return;
    }
  } else if (req.method === HttpCodes.PATCH) {
    try {
      await updateWorkExperienceValidator(req.body);
      await updateExperience(req, res);
      handleRes({ res, status: StatusTypes.OK, message: 'UPDATED' });
      return;
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
      return;
    }
  } else if (req.method === HttpCodes.DELETE) {
    try {
      await updateWorkExperienceValidator(req.query);
      await deleteExperience(req, res);
      handleRes({ res, status: StatusTypes.DELETED, message: 'DELETED' });
      return;
    } catch (e) {
      console.error(e);
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
      return;
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
