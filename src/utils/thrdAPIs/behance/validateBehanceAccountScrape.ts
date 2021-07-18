import Axios from 'axios';
import cheerio from 'cheerio';
import { ValidCheerioNode } from '../types';

const BIO_ABRIDGED_QUERY = 'div.UserInfo-bio-YNh div.ReadMore-inline-3yb';
const BIO_UNABRIDGED_QUERY = 'div.UserInfo-bio-YNh span';

/**
 * Does not work for biographies that are abridged, so at some point use Slimer.js to be able to interact with the JSDOM.
 */
export const validateBehanceAccountScrape = async (
  behanceUsername: string,
  hackerStatUsername: string,
): Promise<boolean> => {
  try {
    const BEHANCE_URL = `https://www.behance.net/${behanceUsername}/info`;
    const { data } = await Axios.get(BEHANCE_URL);
    const $ = cheerio.load(data);
    // Depending on the size of the user's bio, it will affect the bio content's wrapper, so the code checks both
    // and sees which one works and then carries on with the verification.
    const [bioData] = [$(BIO_ABRIDGED_QUERY), $(BIO_UNABRIDGED_QUERY)].filter((queryRes) => queryRes.length > 0);
    const verifiedTags = [];
    bioData.map((tag) => {
      const tagFirstChild = bioData[tag].children[0] as ValidCheerioNode;
      const tagContent = tagFirstChild?.data;
      if (tagFirstChild?.data.includes(`https://hackerstats.io/${hackerStatUsername}`)) {
        verifiedTags.push(tagContent);
      }
    });
    return verifiedTags.length > 0;
  } catch (e) {
    return false;
  }
};
