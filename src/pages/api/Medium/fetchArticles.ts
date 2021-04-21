import Parser from 'rss-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import { stripQueryParameters, addRefToURL } from '../../../utils/hackerFile';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const parser = new Parser();
    const {
      query: { user: username },
    } = req;
    const result = await parser.parseURL(`https://${username}.medium.com/feed/`);
    res.status(200).json({
      articles: result.items.map((article) => {
        return { title: article.title, link: addRefToURL(stripQueryParameters(article.link)), date: article.pubDate };
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Was not a valid user name.' });
  }
};
