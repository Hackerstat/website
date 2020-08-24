export default async (req, res) => {
  res.send((await JSON.parse(req.body)).name);
};

export const config = {
  api: {
    bodyParser: true,
    sizeLimit: '1mb',
  },
};
