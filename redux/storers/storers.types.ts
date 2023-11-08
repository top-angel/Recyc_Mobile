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

export interface StorerDoc {
  id: string;
  _id?: string;
  walletAddress: string;
  name: string;
  address: string;
  geocode: IGeocode;
  postalCode: string;
  city: string;
  country: string;
  worktime: string;
  storageSpace: number;
  createdAt: string;
}
