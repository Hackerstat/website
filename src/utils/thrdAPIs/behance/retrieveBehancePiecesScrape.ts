import Axios from 'axios';
import cheerio from 'cheerio';
import { ValidCheerioNode, BehanceWorkPiecesType } from '../../utils';

const BEHANCE_LINKS_QUERY_SELECTOR = 'div.ProjectCoverNeue-info-4Ul span a.Title-title-3nk.e2e-Title-owner';
const BEHANCE_IMAGES_QUERY_SELECTOR = 'div.Cover-content-2R2 img.ProjectCoverNeue-image-1MZ.js-cover-image';
const BEHANCE_LIKES_AND_WATCHES_QUERY_SELECTOR = 'div.Stats-stats-1iI span';

type RetrieveBehanceAccountScrapeResType = Promise<BehanceWorkPiecesType | null>;

const MAX_BEHANCE_PIECES = 12;
const NEXT_OFFSET = 12;

export const retrieveBehanceAccountScrape = async (behanceUsername: string): RetrieveBehanceAccountScrapeResType => {
  try {
    const behanceProjects = [];
    for (let offset = 0; offset <= MAX_BEHANCE_PIECES; offset += NEXT_OFFSET) {
      const { data } = await Axios.get(`https://www.behance.net/${behanceUsername}/projects?offset=${offset}`);
      const $ = cheerio.load(data);
      const links = $(BEHANCE_LINKS_QUERY_SELECTOR);
      const images = $(BEHANCE_IMAGES_QUERY_SELECTOR);
      const likesAndWatches = $(BEHANCE_LIKES_AND_WATCHES_QUERY_SELECTOR);
      for (let link = 0; link < links.length; link += 1) {
        behanceProjects.push({
          link: links[link].attribs.href,
          title: (links[link].children[0] as ValidCheerioNode)?.data,
          image: images[link].attribs.src,
          likes: parseInt((likesAndWatches[link * 2]?.children[0] as ValidCheerioNode)?.data),
          watches: parseInt((likesAndWatches[link * 2 + 1]?.children[0] as ValidCheerioNode)?.data),
        });
      }
    }
    return behanceProjects;
  } catch (e) {
    // console.error(e);
    return null;
  }
};
