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

export interface WakaTimeDataResType {
  data: Array<{
    grand_total: GrandTotalType;
    range: RangeType;
  }>;
}

/**
 *   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      type: '',
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
 */

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
