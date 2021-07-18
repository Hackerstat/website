import { HackerFileType, ProjectImage, RetrieveDribbblePiecesScrape } from '.';

interface WakaTimeDataSetType {
  type: string;
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}

interface GitHubRepoLanguagesType {
  [key: string]: number;
}

export interface WorkExperienceType {
  companyName?: string;
  position?: string;
  startingDate?: string;
  endDate?: string;
  details?: string;
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

export interface Badges {
  gold: number;
  silver: number;
  bronze: number;
}

export interface StackOverflowUserInfoType {
  reputation: number;
  displayName: string;
  profileImage: string;
}

export interface Tag {
  name: string;
  answerScore: number;
  questionScore: number;
}

export interface FetchStackOverflowInfoRes extends StackOverflowUserInfoType {
  badges: Badges;
  topTags: Array<Tag>;
}

export interface WakaTimeLanguageDataType {
  color: string;
  name: string;
  percent: number;
}

export interface WakaTimeActivityGraphDataPropsType {
  labels: Array<string>;
  datasets: Array<WakaTimeDataSetType>;
}

export interface WakaTimeLanguagesGraphDataPropsType {
  dateText: string;
  hours: number;
  hoursMinutesText: string;
  minutes: number;
  rawDate: string;
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

export interface GitHubUserAccountType {
  avatar_url: string;
  email?: string;
  id?: number;
  user: string;
  name: string;
  location: string;
  followers: number;
  following: number;
}

/**
 * export interface GitLabRepoDetails {
  name: string;
  star: number;
  forks: number;
  des: string;
  id: number;
}
 */

export interface GetRemoteWakaTimeDataRes {
  integrations?: Array<string>;
  integration_settings?: {
    wakatime?: {
      wakaTimeCodingActivityURL?: string;
      wakaTimeLanguageURL?: string;
    };
  };
}

export interface DribbblePiecesData {
  img: string;
  link: string;
  title: string;
}

export interface DribbbleRemoteJSONDataType {
  isValidated: boolean;
  dribbbleUsername: string;
  dribbbleData: RetrieveDribbblePiecesScrape;
}

export interface BehanceWorkPieceType {
  link: string;
  title: string;
  image: string | undefined;
  likes: number;
  watches: number;
}

export type BehanceWorkPiecesType = Array<BehanceWorkPieceType>;

export interface BehanceRemoteJSONDataType {
  isValidated: boolean;
  behanceUsername: string;
  behanceData: BehanceWorkPiecesType;
}
