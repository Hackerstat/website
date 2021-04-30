const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const HACKERSTAT = 'HackerStat';
export const USERPROFILES = 'userProfiles';
export const WAKATIME = 'wakatime';

export const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ehkcd.mongodb.net/HackerStat?retryWrites=true&w=majority`;
export const INFO_PROPERTY = 'info';

export const NO_INTEGRATION_TYPE_ERROR = 'No integration type provided';
export const NO_SETTINGS_OBJECT = 'No settings object provided';
export const INTEGRATION_CACHE = 'integration_cache';
export const NPM = 'npm';
