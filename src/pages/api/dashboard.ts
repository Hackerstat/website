import { HTTPCode } from '../../utils/constants';
import faker from 'faker';

/**
 * @REMOVE
 */
export default async (req, res) => {
  const r = [];

  for (let i = 0; i < 7; ++i) {
    const gender = faker.random.boolean() ? 'male' : 'female';
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);

    const pro = faker.random.boolean() ? 'pro' : undefined;

    const username = faker.internet.userName(firstName, lastName);

    r.push({
      s: pro,
      p: `https://api.adorable.io/avatars/285/${username}.png`,
      n: `${firstName} ${lastName}`,
      u: username,
    });
  }

  res.status(HTTPCode.OK).json({
    users: r,
  });
};
