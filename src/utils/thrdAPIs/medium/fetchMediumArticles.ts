import Parser from 'rss-parser';
import { NextApiRequest } from 'next';
import { stripQueryParameters, addRefToURL } from '../../hackerFile';

interface FetchMediumArticlesRes {
  title: string;
  link: string;
  date: string;
}

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
