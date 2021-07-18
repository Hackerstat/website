import * as yup from 'yup';

const languagesSchema = yup.object().test('Languages Object', 'Languages Object is not in correct form', (obj) => {
  for (const value of Object.values(obj)) {
    if (typeof value !== 'number') {
      return false;
    }
  }
  return true;
});

const gitLabRepoSchema = yup.object().shape({
  repoName: yup.string().strict(true).trim().required(),
  stars: yup.number().strict(true).min(0).required(),
  forks: yup.number().strict(true).min(0).required(),
  des: yup
    .string()
    .strict(true)
    .trim()
    .test(
      'Description Length',
      'Length of Description have to be less than 20,000 characters',
      (des) => des.length <= 20_000,
    ),
  id: yup.number().strict(true),
  languages: languagesSchema,
  owner: yup.string().strict(true).trim().required(),
  sz: yup.number().strict(true).min(0).required(),
  private: yup.bool().strict(true).required(),
  lastUpdated: yup.string().required().strict(true),
  url: yup.string().trim().required(),
  contributors: yup.string().trim().strict(true).notRequired(),
});

export const addGitLabDataSchema = yup.object().shape({
  avatar_url: yup.string().strict(true).trim().required(),
  email: yup.string().strict(true).trim().required(),
  username: yup.string().strict(true).trim().required(),
  id: yup.number().strict(true).min(0),
  followers: yup.number().strict(true).min(0).required(),
  following: yup.number().strict(true).min(0).required(),
  location: yup.string().strict(true).nullable(true),
  repos: yup.array(gitLabRepoSchema).required(),
});

export type AddGitLabDataSchemaType = yup.InferType<typeof addGitLabDataSchema>;
