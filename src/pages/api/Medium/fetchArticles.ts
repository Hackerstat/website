import Parser from 'rss-parser';
import { userQueryValidator } from '../../../utils/validation';
import { NextApiRequest, NextApiResponse } from 'next';
import { stripQueryParameters, addRefToURL } from '../../../utils/hackerFile';
import { HTTPCode } from '../../../utils/constants';

/**
 * @name fetchArticles
 * @description This function fetches Medium articles via the RSS feed.
 * @author @Cgunter1 @LouisIV
 * @argument {string} user The user's Medium username.
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const parser = new Parser();
    try {
      await userQueryValidator(req.query);
    } catch ({ message }) {
      res.status(HTTPCode.BAD_REQUEST).send(message);
      console.log(message);
      return;
    }
    const {
      query: { user: username },
    } = req;
    const result = await parser.parseURL(`https://${username}.medium.com/feed/`);
    res.status(HTTPCode.OK).json({
      articles: result.items.map((article) => {
        return { title: article.title, link: addRefToURL(stripQueryParameters(article.link)), date: article.pubDate };
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(HTTPCode.BAD_REQUEST).json({ error: 'Was not a valid user name.' });
  }
};
