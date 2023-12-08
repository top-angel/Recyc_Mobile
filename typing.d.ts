type Geocode = {
  lat: number;
  lng: number;
};

type StorerApplication = {
  status: unknown;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  openings: string;
  storageSpace: string;
  geocode: Geocode;
};

type Chat = {
  id: string;
  name: string;
  role: string;
  company: string;
  address: string;
  amount: number;
  timestamp: string;
  icon: React.ReactElement<any, any>;
};

type Message = {
  message: string;
  isSender: boolean;
  timestamp: number;
};

type Bounty = {
  companyName: string;
  companyDescription: string;
  bountyType: string;
  bountyName: string;
  bountyDescription: string;
  tags: string;
  sampleDataList: string;
  imageRequirements: string;
  imageCount: string;
  imageForFormat: string;
  numberOfVerifications: string;
  numberOfAnnotations: string;
  email: string;
  address: string;
  country: string;
};

type CollectorBounty = {
  firstName: string;
  lastName: string;
};

type FormDataFile = {
  uri: string;
  type: string;
  name: string;
};

type Collectors = {
  id: string;
  name: string;
  address: string;
  rewarded: string;
  collected: number;
};

type BountyUpdate = {
  missionTitle: string;
  companyTitle: string;
  missionDescription: string;
  totalRewards: number;
};

type Tag = {
  id: string;
  title: string;
};

type MisssionClaim = {
  missionId: string;
  bountyId: string;
  bountyName: string;
  companyName: string;
  startDate: string;
  endDate: string;
};

type CollectorUploadFile = {
  fileData: FormDataFile;
  mission: MisssionClaim;
};

type StorerUploadFile = {
  fileData: FormDataFile;
  totalItems: number;
  missionId: string;
};
