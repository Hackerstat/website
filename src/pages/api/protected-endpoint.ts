import { HTTPCode } from '../../utils/constants';
import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req, res) {
  try {
    console.log('asdsad');
    console.log(req);
    const { user } = await auth0.getSession(req);
    console.log(user);
    res.status(HTTPCode.OK).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || HTTPCode.SERVER_ERROR).end(error.message);
  }
});
