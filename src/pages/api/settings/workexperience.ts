import { NextApiRequest, NextApiResponse } from 'next';
import { updateExperience, deleteExperience, retrieveWorkExperience, addWorkExperience } from '../../../utils/mongo';
import { addWorkExperienceValidator, updateWorkExperienceValidator } from '../../../utils/validation';
import auth0 from '../../../utils/auth';
import { HTTPCode } from '../../../utils/constants';

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'GET') {
      try {
        const workExperience = await retrieveWorkExperience(req);
        res.status(HTTPCode.OK).json({ workExperience: workExperience });
      } catch (e) {
        res.status(HTTPCode.SERVER_ERROR).send('Server Error');
        return;
      }
    } else if (req.method === 'POST') {
      try {
        await addWorkExperienceValidator(req.body);
        await addWorkExperience(req);
        res.status(HTTPCode.OK).send('OK');
        return;
      } catch (e) {
        console.error(e);
        res.status(HTTPCode.SERVER_ERROR).send('Server Error');
        return;
      }
    } else if (req.method === 'PATCH') {
      try {
        await updateWorkExperienceValidator(req.body);
        await updateExperience(req);
        res.status(HTTPCode.OK).send('UPDATED');
        return;
      } catch (e) {
        console.error(e);
        res.status(HTTPCode.SERVER_ERROR).send('Server Error');
        return;
      }
    } else if (req.method === 'DELETE') {
      try {
        await updateWorkExperienceValidator(req.query);
        await deleteExperience(req);
        res.status(HTTPCode.DELETED).send('DELETED');
        return;
      } catch (e) {
        console.error(e);
        res.status(HTTPCode.SERVER_ERROR).send('Server Error');
        return;
      }
    }
  },
);

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
