type HackerFileType = 'project';

type ProjectImage = {
  description: string;
  alt: string;
  url: string; // imgur link
};

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

  images: Array<ProjectImage>;
}
