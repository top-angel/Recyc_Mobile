export interface StorersDoc {
  name: string;
  address: string;
  geocode: Geocode;
  postalCode: string;
  city: string;
  country: string;
  openings: string;
  storageSpace: number;
}

export interface IGeocode {
  lat: number;
  lng: number;
}

export interface StorerProfileDoc {
  name: string;
  address: string;
  geocode: IGeocode;
  postalCode: string;
  city: string;
  country: string;
  worktime: string;
  storageSpace: number;
}

export interface StorerDoc {
  id: string;
  profile: StorerProfileDoc;
  roles: Array<string>;
  status: string;
}
