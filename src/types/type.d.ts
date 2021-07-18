import { DribbblePiecesData } from '.';

export type HackerFileType = 'project';

export type ProjectImage = {
  description: string;
  alt: string;
  url: string;
};

export type RetrieveDribbblePiecesScrape = Array<DribbblePiecesData>;
