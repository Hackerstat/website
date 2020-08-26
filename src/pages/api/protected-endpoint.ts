import auth0 from '../../utils/auth';

export default auth0.requireAuthentication(async function me(req, res) {
  try {
    const { user } = await auth0.getSession(req);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
});
