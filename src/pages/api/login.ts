import { HTTPCode } from '../../utils/constants';
import auth0 from '../../utils/auth';

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res, {});
  } catch (error) {
    console.error(error);
    res.status(error.status || HTTPCode.SERVER_ERROR).end(error.message);
  }
}
