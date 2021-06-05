import auth0 from '../../utils/auth';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      afterCallback: async (req, res, session, state) => {
        return {
          ...session,
          user: {
            ...session.user,
            username: 'Username from the database',
          },
        };
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
