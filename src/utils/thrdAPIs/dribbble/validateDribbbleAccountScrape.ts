import Axios from 'axios';
import cheerio, { Element } from 'cheerio';
import { HACKERSTAT_VERIFICATION_URL } from '../..';

const checkTagAttr = (hackerStatUsername: string, urlTags: Array<Element>, i: number, el: Element) => {
  if (el.attribs.href.includes(HACKERSTAT_VERIFICATION_URL(hackerStatUsername))) {
    urlTags.push(el);
  }
};

export const validateDribbbleAccountScrape = async (
  dribbbleUsername: string,
  hackerStatUsername: string,
): Promise<boolean> => {
  const DRIBBBLE_URL = `https://dribbble.com/${dribbbleUsername}/about`;
  try {
    const { data } = await Axios.get(DRIBBBLE_URL);
    const $ = cheerio.load(data);
    const bioData = $('div.bio p.bio-text a');
    const urlTags = [];
    bioData.map((i, el) => checkTagAttr(hackerStatUsername, urlTags, i, el));
    if (urlTags.length >= 1) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};
