import Axios from 'axios';

/**
 * @name getCurrentUsername
 * @description It is a function that retrieves a HackerStat user's username.
 * @author @LouisIV
 * @returns {string}
 */
export const getCurrentUsername = async (): Promise<string> => {
  const result = await Axios.get('/api/settings/username');
  return result.data?.username;
};
