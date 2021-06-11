import { HTTPCode } from '../../utils/constants';
import auth0 from '../../utils/auth';

/**
 * @REMOVE
 */
export default auth0.withApiAuthRequired(async function me(req, res) {
  try {
    console.log('asdsad');
    console.log(req);
    const { user } = await auth0.getSession(req, res);
    console.log(user);
    res.status(HTTPCode.OK).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || HTTPCode.SERVER_ERROR).end(error.message);
  }
});
