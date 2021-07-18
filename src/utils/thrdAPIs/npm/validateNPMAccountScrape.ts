import Axios from 'axios';
import cheerio from 'cheerio';
import { GITHUB_USER_URL } from '../../constants';
/**
 * @name validateNPMAccountScrape
 * @description The function scrapes a user's NPM Profile page and check for GitHub Integration for verification.
 * @author @Cgunter1
 * @param {string} username NPM Account Username
 * @param {string} gitHubUsername HackerStat user's GitHub Username
 * @returns {boolean}
 */

export const validateNPMAccountScrape = async (username: string, gitHubUsername: string): Promise<boolean> => {
  try {
    const npmrofilePage = await Axios.get(`https://www.npmjs.com/~${username}`);
    const $ = cheerio.load(npmrofilePage.data);
    const gitHubUserURL = GITHUB_USER_URL(gitHubUsername);
    const descriptionMetaData = $('a.truncate.no-underline.pr1')[0].attribs.href;
    if (descriptionMetaData !== undefined) {
      if (descriptionMetaData === gitHubUserURL) {
        return true;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
