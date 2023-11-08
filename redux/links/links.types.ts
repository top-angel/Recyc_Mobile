export interface ILinkedImage {
  fieldname: string;
  originalname: string;
  mimetype: string;
  destination: string;
  path: string;
}

export interface ILink {
  _id: string;
  id: string;
  image: ILinkedImage;
  bountyid: string;
  timestamp: number;
}
