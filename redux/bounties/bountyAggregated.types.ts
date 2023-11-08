import { ItemStatus } from "../../enums/itemStatus.types";

export interface BountyAggregatedDoc {
  id: string;
  _id?: string;
  serialNumber: string;
  status: ItemStatus;
  bountyName: string;
  companyName: string;
  bountyId: string;
  isUsed: boolean;
  isUsedByCollector: boolean;
  owner: string;
  collectedBy: string;
  verifiedBy: string;
  usedAt: number;
  collectedAt: number;
  verifiedAt: number;
  returnedAt: number;
  createdAt: string;
}

export interface AggregatedItemDoc {
  id: string;
  _id?: string;
  hashedLink: string;
  items: string[];
  isClaimed: boolean;
  collectedBy: string;
  companyName: string;
  missionId: string;
  bountyId: string;
  createdAt: string;
}
