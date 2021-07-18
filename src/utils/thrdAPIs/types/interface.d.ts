import { Node } from 'cheerio';

export interface ValidCheerioNode extends Node {
  data: string;
}
