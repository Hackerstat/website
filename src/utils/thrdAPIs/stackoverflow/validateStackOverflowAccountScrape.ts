import Axios from 'axios';
import cheerio, { Node } from 'cheerio';
import { HACKERSTAT_VERIFICATION_URL } from '../..';

interface NodeData extends Node {
  data: string;
  namespace: string;
}

/**
 * @name validateStackOverflowAccountScrape
 * @description The function scrapes a user's StackOverflow Profile page and check for HackerStat Integration.
 * @author @Cgunter1
 * @param {string} username StackOverflow Account Username
 * @param {string} hackerStatUsername HackerStat Username
 * @returns {boolean}
 */

export const validateStackOverflowAccountScrape = async (
  username: string,
  hackerStatUsername: string,
): Promise<boolean> => {
  try {
    const stackOverFlowProfilePage = await Axios.get(`https://stackoverflow.com/users/${username}?tab=profile`);
    const $ = cheerio.load(stackOverFlowProfilePage.data);
    const descriptionMetaData = $('div.profile-user--bio');
    for (const node of descriptionMetaData.children()) {
      for (const innerNode of node.children) {
        const nodeData = (innerNode as NodeData)?.data;
        if (nodeData && nodeData.includes(HACKERSTAT_VERIFICATION_URL(hackerStatUsername))) {
          return true;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};
