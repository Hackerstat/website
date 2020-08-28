import Axios from 'axios';
import { verifyType, stripQueryParameters, addRefToURL } from '../../../utils/hackerFile';
import Parser from 'rss-parser';

export default async (req, res) => {
  try {
    const parser = new Parser();
    const {
      query: { user: username },
    } = req;
    const result = await parser.parseURL('https://medium.com/feed/' + username);
    res.status(200).json({
      articles: result.items.map((article) => {
        return { title: article.title, link: article.link };
      }),
    });
  } catch (err) {
    res.status(400).json({ error: 'Was not a valid user name.' });
  }
};
