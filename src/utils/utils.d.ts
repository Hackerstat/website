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
