import { updateInfo, getInfo } from '../../../utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { handleRes, StatusTypes, userInfoQueryValidator, HttpCodes } from '../../../utils';

/**
 * @name info
 * @description This function posts userinfo to the MongoDB and retrieves the userinfo.
 * @authentication user: auth0 token
 * @param {userInfoSchema} info It is the user info (i.e. name, emaul) that is being to the HackerStat user's profile.
 * @returns {void} */
export default auth0.withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === HttpCodes.POST) {
    try {
      try {
        await userInfoQueryValidator(req.body);
      } catch ({ message }) {
        console.error(message);
        handleRes({ res, status: StatusTypes.BAD_REQUEST, message });
        return;
      }
      await updateInfo(req, res);
      handleRes({ res, status: StatusTypes.OK });
    } catch (e) {
      res.status(500).send('Server Error');
    }
  } else if (req.method === HttpCodes.GET) {
    try {
      const info = await getInfo(req, res);
      handleRes({ res, status: StatusTypes.OK, jsonData: info });
    } catch (e) {
      handleRes({ res, status: StatusTypes.SERVER_ERROR });
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
