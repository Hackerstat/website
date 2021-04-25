import { NextApiRequest } from 'next';
import Axios from 'axios';
import { fetchStackOverflowInfoRes } from '../utils';
import { STACKOVERFLOW_URL_TAGS, STACKOVERFLOW_URL_USER } from '../constants';

export const fetchStackOverflowInfo = async (req: NextApiRequest): Promise<fetchStackOverflowInfoRes> => {
  const { username } = req.query;
  const tagRetrieval = Axios.get(STACKOVERFLOW_URL_TAGS(username as string));
  const userRetrieval = Axios.get(STACKOVERFLOW_URL_USER(username as string));
  const res = await Promise.all([tagRetrieval, userRetrieval]);

  console.log(res[1].data);

  const {
    badge_counts: { bronze, silver, gold },
    reputation,
  } = res[1].data.items[0];

  const topTags = [];
  if (res && res.length) {
    res[0].data.items.forEach((tag) => {
      topTags.push({
        name: tag.tag_name,
        answerScore: tag.answer_score,
        questionScore: tag.question_score,
      });
    });
  }
  return { badges: { bronze, silver, gold }, reputation, topTags };
};
