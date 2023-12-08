// export interface CreatorDoc {
//   missionTitle: string;
//   companyTitle: string;
//   materialType: string;
//   materialSize: string;
//   materialNumber: number;
//   missionDescription: string;
//   totalRewards: number;
//   location: string;
//   startDate: string;
//   endDate: string;
//   imageRequirements: string;
//   itemsCount: number;
//   bountyImage: string;
//   email: string;
//   address: string;
//   country: string;
// }

export interface CreatorProfileDoc {
  address: string;
  company_title: string;
  country: string;
  email: string;
  profileImage: string;
}

export interface CreatorDoc {
  id: string;
  profile: CreatorProfileDoc;
  roles: Array<string>;
  status: string;
}
