import Parser from 'rss-parser';
import { NextApiRequest } from 'next';
import { stripQueryParameters, addRefToURL } from '../hackerFile';
import { FetchMediumArticlesRes } from '../utils';
export const fetchMediumArticles = async (req: NextApiRequest): Promise<Array<FetchMediumArticlesRes>> => {
  const parser = new Parser();
  const {
    query: { user: username },
  } = req;
  const result = await parser.parseURL(`https://${username}.medium.com/feed/`);

  return result.items.map((article) => {
    return { title: article.title, link: addRefToURL(stripQueryParameters(article.link)), date: article.pubDate };
  });
};
