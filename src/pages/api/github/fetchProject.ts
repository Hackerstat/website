import YAML from 'yaml';
import Axios from 'axios';
import { verifyType, stripQueryParameters, addRefToURL } from '../../../utils/hackerFile';
import { HackerFile } from '../../../types/hackerfile';

// https://raw.githubusercontent.com/LouisIV/next-starter/master/.hacker.yml
// https://github.com/LouisIV/next-starter/blob/master/.hacker.yml

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

export default async (req, res) => {
  const { url: rawFileURL, repo, user } = getRepoFromURL('https://github.com/LouisIV/next-starter');
  const result = await downloadFile(rawFileURL);

  const yaml: HackerFile = YAML.parse(result);

  if (!yaml.name) {
    res.status(400).json({ error: 'Invalid Type' }).end();
  }

  if (!verifyType(yaml.type)) {
    res.status(400).json({ error: 'Invalid Type' }).end();
  }

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

  res.status(200).json({ result: file, repo: repo, user: user, repoURL: `https://github.com/${user}/${repo}` });
};