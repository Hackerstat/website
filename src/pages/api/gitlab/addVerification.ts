import { NextApiRequest, NextApiResponse } from 'next';
import Axios, { AxiosResponse } from 'axios';
import { USERPROFILE_URL, REPO_URL, LANGUAGE_URL_GITLAB, REPO_SPECIFIC_URL_GITLAB } from '../../../utils/constants';
import { HTTPCode } from '../../../utils/constants';

/**
 *         Axios.get(USERPROFILE_URL, {
          params: { access_token },
        })
          .then((res) => {
            const { avatar_url, email, username, name, id, followers, following, location } = res.data;
            console.log(res.data);
            setGitLabAccountData({ avatar_url, email, user: username, name, id, followers, following, location });
            const REPO_URL = `https://gitlab.com/api/v4/users/${id}/projects`;
            Axios.get(REPO_URL)
              .then((res) => {
                const repos = res.data.map((repo) => ({
                  name: repo.name,
                  stars: repo.star_count,
                  forks: repo.forks_count,
                  des: repo.description,
                  id: repo.id,
                }));
                setGitLabUserRepos(repos);
                setLoaded(true);
              })
 */
/**
 * @name addVerification
 * @author @Cgunter1
 * @status NOT_FINISHED
 * @description This function completes the GitLab OAuth process by using the retrieved code, GitLab OAuth keys, and access token to retrive the user's GitLab info (i.e. repos, followers).
 * @returns {void}
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      // const URL = `https://gitlab.com/oauth/token`;
      // const gitLabTokenInfo = await Axios.post(URL, {
      //   client_id: process.env.GITLAB_APP_ID,
      //   client_secret: process.env.GITLAB_SECRET_KEY,
      //   code: req.query.code,
      //   grant_type: 'authorization_code',
      //   redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
      // });
      // console.log(req.query.code);
      if (req.headers.gitlabtoken) {
        console.log('asd');
        const { gitlabtoken: access_token } = req.headers;
        console.log(access_token);

        const { avatar_url, email, username, name, id, followers, following, location } = (
          await Axios.get(USERPROFILE_URL, { params: { access_token } })
        ).data;

        const userRepos = (await Axios.get(REPO_URL(id), { params: { access_token } })).data.map((repo) => ({
          repoName: repo.name,
          stars: repo.star_count,
          forks: repo.forks_count,
          des: repo.description,
          id: repo.id,
        }));

        const languagesPromiseList = userRepos.map((repo) => Axios.get(LANGUAGE_URL_GITLAB(repo.id)));

        (await Promise.all(languagesPromiseList)).forEach((languagesRepo: AxiosResponse<any>, index) => {
          userRepos[index].languages = languagesRepo.data;
        });

        const repoIndividualData = userRepos.map((repo) =>
          Axios.get(REPO_SPECIFIC_URL_GITLAB(repo.id), { headers: { Authorization: `Bearer ${access_token}` } }),
        );

        (await Promise.all(repoIndividualData)).forEach((detailedRepo: AxiosResponse<any>, index) => {
          const repoData = detailedRepo.data;
          console.log(repoData);
          userRepos[index].owner = repoData.owner.name;
          userRepos[index].sz = repoData.statistics ? repoData.statistics.repository_size : 0;
          userRepos[index].private = repoData.owner.visibility === 'private';
          userRepos[index].lastUpdated = repoData.last_activity_at;
          userRepos[index].url = repoData.web_url;
          userRepos[index].contributors = '';
        });

        const gitLabProfile = {
          avatar_url,
          email,
          username,
          name,
          id,
          followers,
          following,
          location,
          repos: userRepos,
        };

        console.log(gitLabProfile);

        res.status(HTTPCode.OK).json(gitLabProfile);
      } else {
        res.status(HTTPCode.BAD_REQUEST).send('No Access Code');
      }
    } catch (e) {
      console.error(e);
      res.status(HTTPCode.SERVER_ERROR).send(e);
    }
  }
};
