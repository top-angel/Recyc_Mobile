export interface CollectorProfileDoc {
  first_name: string;
  last_name: string;
  profileImage: string;
}

export interface CollectorDoc {
  id: string;
  profile: CollectorProfileDoc;
  roles: Array<string>;
  status: string;
}