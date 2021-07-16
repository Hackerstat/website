const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const HACKERSTAT = 'HackerStat';
export const USERPROFILES = 'userProfiles';
export const GITHUBDATA = 'githubData';
export const GITLABDATA = 'gitlabData';
export const DRIBBBLEDATA = 'dribbbleData';
export const STACKOVERFLOWDATA = 'stackOverFlowData';
export const WAKATIME = 'wakatime';
export const GITHUB = 'github';
export const GITLAB = 'gitlab';
export const STACKOVERFLOW = 'stackoverflow';

export const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
export const INFO_PROPERTY = 'info';

export const NO_INTEGRATION_TYPE_ERROR = 'No integration type provided';
export const NO_SETTINGS_OBJECT = 'No settings object provided';
export const INTEGRATION_CACHE = 'integration_cache';
export const NPM = 'npm';
