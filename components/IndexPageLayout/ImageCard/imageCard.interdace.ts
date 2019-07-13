/** props of image card entity */

export interface IImageCard {
  /** id of the picture */
  id: string;
  /** color of the picture */
  color: string;
  /** description of the picture */
  description?: string;
  /** description for alt tags used by accessibility apps */
  altDescription?: string;
  /** urls to picture with different resolutions */
  urls: IImageUrls;
  /** links for photo */
  links: IImageLinks;
  /** number of likes of photo */
  likes: number;
  /** user info */
  user: IUser;
}

export interface IImageUrls {
  /** url to raw photo */
  raw: string;
  /** url to full photo */
  full: string;
  /** url to regular photo resolution (width 1080) */
  regular: string;
  /** url to small (width 400) */
  small: string;
  /** url to thumb photo resolution (width 200) */
  thumb: string;
}

export interface IImageLinks {
  /** link to download picture */
  download: string;
}

export interface IProfileImage {
  /** small photo link */
  small: string;
  /** medium photo link */
  medium: string;
  /** large photo link */
  large: string;
}

export interface IUser {
  /** user id */
  id: string;
  /** username */
  username: string;
  /** real name of user */
  name: string;
  /** bio */
  bio?: string;
  /** links to profile images */
  profileImage?: IProfileImage;
}
