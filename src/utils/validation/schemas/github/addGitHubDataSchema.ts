import * as yup from 'yup';

export const gitRepoSchema = yup.object().shape({
  contributors: yup.string().strict(true).trim(),
  des: yup.string().default('').trim(),
  lastUpdated: yup.string().strict(true).trim().required(),
  forks: yup.number().strict(true),
  languages: yup.object(),
  owner: yup.string().strict(true).trim().required(),
  private: yup.boolean().strict(true).required(),
  repoName: yup.string().strict(true).trim().required(),
  stars: yup.number().strict(true),
  sz: yup.number().strict(true),
  watchers: yup.number().strict(true),
  url: yup.string().strict(true).trim().required(),
});

export const addGitHubDataSchema = yup
  .object()
  .shape({
    avatar_url: yup.string().strict(true).trim(),
    user: yup.string().strict(true).trim(),
    name: yup.string().strict(true).trim(),
    location: yup.string().strict(true).trim(),
    followers: yup.number().strict(true),
    following: yup.number().strict(true),
    repos: yup.array(gitRepoSchema).required(),
  })
  .required();

export type AddGitHubDataType = yup.InferType<typeof addGitHubDataSchema>;
