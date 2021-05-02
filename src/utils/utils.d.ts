enum integrationTypes {
  npm,
  github,
  medium,
  twitter,
  gitlab,
  stackoverflow,
  dockerhub,
  wakatime,
  hackerrank,
  producthunt,
  dribble,
  behance,
}

export interface IUserProfileData {
  firstName: string;
  lastName: string;
  website: string;
  email: string;
  bio: string;
  school: string;
  location: string;
}

export interface RetrievedIUserProfileData {
  firstName?: string;
  lastName?: string;
  website?: string;
  email?: string;
  bio?: string;
  school?: string;
  location?: string;
}

interface IntegrationSettingsType {
  [key in integrationTypes]: any;
}

export interface WorkExperienceType {
  companyName?: string;
  position?: string;
  startingDate?: string;
  endDate?: string;
  details?: string;
}

export interface UserProfileType {
  _id: string;
  authID: string;
  integration_settings?: IntegrationSettingsType;
  integration_cache?: any;
  username: string;
  integrations?: Array<string>;
  info?: RetrievedIUserProfileData;
  workExperience?: Array<WorkExperienceType>;
}

export interface DeleteExperienceParams {
  i: string;
  [key: string]: string | Array<string>;
}

export interface HackerFile {
  /**
   * Name of the project
   */
  name: string;
  /**
   * Type of project
   */
  type: HackerFileType;

  /**
   * Description of the project
   */
  description?: string;

  /**
   * Link to an external resource
   */
  externalURL?: string;

  /**
   * Description of the external resource
   */
  externalURLDescription?: string;

  images?: Array<ProjectImage>;
}

export interface FetchGithubYMLRes {
  result: any;
  repo: string;
  user: string;
  repoURL: string;
}

export interface FetchMediumArticlesRes {
  title: string;
  link: string;
  date: string;
}

interface Badges {
  gold: number;
  silver: number;
  bronze: number;
}

interface Tag {
  name: string;
  answerScore: number;
  questionScore: number;
}

export interface fetchStackOverflowInfoRes {
  reputation: number;
  badges: Badges;
  topTags: Array<Tag>;
}

export interface WakaTimeDayDataType {
  date: string;
  hours: number;
  minutes: number;
  title: string;
}

export interface GrandTotalType {
  hours: number;
  minutes: number;
  text: string;
}

export interface RangeType {
  date: string;
  text: string;
}

export interface WakaTimeActivityData {
  grand_total: GrandTotalType;
  range: RangeType;
}

export interface WakaTimeDataResType {
  data: Array<WakaTimeActivityData>;
}

export interface WakaTimeLanguageDataType {
  color: string;
  name: string;
  percent: number;
}

export interface WakaTimeDataPieType {
  data: Array<WakaTimeLanguageDataType>;
}

/**
 *   sub,
  wakaTimeCodingActivityURL,
  wakaTimeLanguageURL,
 */

export interface AddWakaTimeIntegrationProps {
  sub: any;
  wakaTimeCodingActivityURL: string;
  wakaTimeLanguageURL: string;
}
interface WakaTimeDataSetType {
  type: string;
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}
export interface WakaTimeGraphDataPropsType {
  labels: Array<string>;
  datasets: Array<WakaTimeDataSetType>;
}

export interface WakaTimePieGraphDataResType {
  dateText: string;
  hours: number;
  hoursMinutesText: string;
  minutes: number;
  rawDate: string;
}

interface GitHubRepoLanguagesType {
  [key: string]: number;
}

export interface GitHubRepoDataType {
  name: string;
  owner: {
    login: string;
  };
  private: string;
  html_url: string;
  description: string;
  size: number;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  languages_url: string;
  contributors_url: repo.contributors_url;
}

export interface GitHubRepoDisplayDataType {
  contributors: string;
  des: string;
  forks: number;
  languages: GitHubRepoLanguagesType;
  lastUpdated: string;
  owner: string;
  private: boolean;
  repoName: string;
  stars: number;
  sz: number;
  url: string;
  watchers: number;
}

/**
 *   const [gitHubUserImg, setgitHubUserImg] = useState('https://avatars.githubusercontent.com/u/22761143?v=4');
  const [gitHubUserName, setgitHubUserName] = useState('Cgunter1');
  const [gitHubUserFullName, setgitHubUserFullName] = useState('Christopher Gunter');
  const [gitHubUserLocation, setgitHubUserLocation] = useState('Santa Cruz, CA');
  const [gitHubUserFollowers, setgitHubUserFollowers] = useState(1);
  const [gitHubUserFollowing, setgitHubUserFollowing] = useState(3);
 */

export interface GitHubUserAccountType {
  avatar_url: string;
  user: string;
  name: string;
  location: string;
  followers: number;
  following: number;
}
