import Axios from 'axios';
import { FetchStackOverflowInfoRes } from '../../../types';
import { STACKOVERFLOW_URL_TAGS, STACKOVERFLOW_URL_USER } from '../../constants';

export const fetchStackOverflowInfo = async (username: string): Promise<FetchStackOverflowInfoRes> => {
  const tagRetrieval = Axios.get(STACKOVERFLOW_URL_TAGS(username));
  const userRetrieval = Axios.get(STACKOVERFLOW_URL_USER(username));
  const res = await Promise.all([tagRetrieval, userRetrieval]);

  console.log(res[1].data);

  const {
    badge_counts: { bronze, silver, gold },
    reputation,
    profile_image,
    display_name,
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
  return {
    badges: { bronze, silver, gold },
    reputation,
    topTags,
    profileImage: profile_image,
    displayName: display_name,
  };
};
