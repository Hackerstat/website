import cheerio from 'cheerio';
import Axios from 'axios';
import { RetrieveDribbblePiecesScrape, ValidCheerioNode } from '../../utils';

export const retrieveDribbblePiecesScrape = async (dribbbleUsername: string): Promise<RetrieveDribbblePiecesScrape> => {
  const BASE_URL = `https://dribbble.com`;
  const dribbbleImgsQuerySelector =
    'ol.dribbbles.group.shots-grid-with-large-shots figure.shot-thumbnail-placeholder img';
  const dribbbleLinksQuerySelector = 'ol.dribbbles.group.shots-grid-with-large-shots a.js-shot-thumbnail-link';
  const dribbbleTitleQuerySelector = 'ol.dribbbles.group.shots-grid-with-large-shots div.shot-title';

  const { data: dribbblePage } = await Axios.get(`${BASE_URL}/${dribbbleUsername}/shots`);

  const $ = cheerio.load(dribbblePage);

  const dribbblePiecesImgs = [];
  $(dribbbleImgsQuerySelector).map((i, el) => dribbblePiecesImgs.push(el.attribs.src));
  const dribbblePiecesLinks = [];
  $(dribbbleLinksQuerySelector).map((i, el) => dribbblePiecesLinks.push(`${BASE_URL}` + el.attribs.href));
  const dribbblePiecesTitles = [];
  $(dribbbleTitleQuerySelector).map((i, el) => dribbblePiecesTitles.push((el.children[0] as ValidCheerioNode)?.data));

  return dribbblePiecesImgs.map((img, i) => ({ img, link: dribbblePiecesLinks[i], title: dribbblePiecesTitles[i] }));
};
