import Axios from 'axios';
import cheerio from 'cheerio';
import { HACKERSTAT_VERIFICATION_URL } from '../..';

/**
 * @name validateMediumAccountScrape
 * @description The function scrapes a user's Medium Profile page and check for HackerStat Integration.
 * @author @Cgunter1
 * @param {string} username Medium Account Username
 * @param {string} hackerStatUsername HackerStat Username
 * @returns {boolean}
 */

export const validateMediumAccountScrape = async (username: string, hackerStatUsername: string): Promise<boolean> => {
  const mediumProfilePage = await Axios.get(`https://${username}.medium.com/`);
  const $ = cheerio.load(mediumProfilePage.data);
  const descriptionMetaData = $('meta[property=og:description]')['0']?.attribs?.content;
  if (descriptionMetaData !== undefined) {
    if (descriptionMetaData.includes(HACKERSTAT_VERIFICATION_URL(hackerStatUsername))) {
      return true;
    }
  }
  return false;
};
