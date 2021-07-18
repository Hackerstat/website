import YAML from 'yaml';
import Axios from 'axios';
import { verifyType, stripQueryParameters, addRefToURL } from '../../hackerFile';
import { NextApiRequest } from 'next';
import { HackerFile } from '../../../types';

// https://raw.githubusercontent.com/LouisIV/next-starter/master/.hacker.yml
// https://github.com/LouisIV/next-starter/blob/master/.hacker.yml

interface FetchGithubYMLRes {
  result: any;
  repo: string;
  user: string;
  repoURL: string;
}

/**
 * Given a project url, gets the hackerstats file
 * @param url The GitHub project repo
 */
const getRepoFromURL = (
  url: string,
  branch = 'master',
  filename = '.hacker.yml',
): { url: string; user: string; repo: string } => {
  const r = /(https|http):\/\/github.com\/(?<user>[^\/]+)\/(?<repo>[^\/]+).*/m;
  const res = url.match(r);
  return {
    url: `https://raw.githubusercontent.com/${res.groups.user}/${res.groups.repo}/${branch}/${filename}`,
    user: res.groups.user,
    repo: res.groups.repo,
  };
};

const downloadFile = async (fileURL: string) => {
  try {
    const raw = await Axios.get(fileURL);
    return raw.data;
  } catch (err) {
    console.error(err);
  }
};

const isString = (s: any): s is string => typeof s === 'string';

export const fetchGithubYML = async (req: NextApiRequest): Promise<FetchGithubYMLRes> => {
  const { repoURL } = req.query;

  if (!isString(repoURL)) {
    throw new Error('Invalid Repo URL');
  }

  const { url: rawFileURL, repo, user } = getRepoFromURL(repoURL);
  const result = await downloadFile(rawFileURL);

  const yaml: HackerFile = YAML.parse(result);

  if (!yaml.name) {
    throw new Error('Invalid Type');
  }

  if (!verifyType(yaml.type)) {
    throw new Error('Invalid Type');
  }

  console.log(yaml);

  const file: HackerFile = {
    name: yaml.name,
    type: yaml.type,
  };

  // Add external URL and description
  if (yaml.externalURL) {
    file.externalURL = addRefToURL(stripQueryParameters(yaml.externalURL));

    if (yaml.externalURLDescription && typeof yaml.externalURLDescription === 'string') {
      file.externalURLDescription = `${yaml.externalURLDescription}`;
    }
  }

  return { result: file, repo: repo, user: user, repoURL: `https://github.com/${user}/${repo}` };
};
