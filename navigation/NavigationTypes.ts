export enum ROUTES {
  HOME = "HOME",
  CREATE_MISSION = "CREATE_MISSION",
  CREATE_MISSION_CREATE = "CREATE_MISSION_CREATE",
  CREATE_MISSION_CREATED = "CREATE_MISSION_CREATED",
  CREATE_MISSION_SINGLE = "CREATE_MISSION_SINGLE",
  CREATE_MISSION_CHAT = "CREATE_MISSION_CHAT",
  CREATE_MISSION_CHAT_ROOM = "CREATE_MISSION_CHAT_ROOM",
  CREATE_MISSION_ITEM_STATUS = "CREATE_MISSION_ITEM_STATUS",
  CREATE_MISSION_ITEM_STATUS_COLLECTORS = "CREATE_MISSION_ITEM_STATUS_COLLECTORS",
  CREATE_MISSION_ITEM_STATUS_STORERS = "CREATE_MISSION_ITEM_STATUS_STORERS",
  CREATE_MISSION_ITEM_LOG = "CREATE_MISSION_ITEM_LOG",
  CREATE_MISSION_DETAILS = "CREATE_MISSION_DETAILS",
  CREATE_ITEM_IMAGES = "CREATE_ITEM_IMAGES",
  CREATE_QR_SCANNER = "CREATE_QR_SCANNER",
  CREATE_QR_SCANNER_RETURN = "CREATE_QR_SCANNER_RETURN",
  CREATE_TRACE_REPORT = "CREATE_TRACE_REPORT",
  COLLECT_MISSIONS = "COLLECT_MISSIONS",
  COLLECT_REGISTRATION = "COLLECT_REGISTRATION",
  COLLECT_MISSIONS_ABOUT = "COLLECT_MISSIONS_ABOUT",
  COLLECT_MISSION_SINGLE = "COLLECT_MISSION_SINGLE",
  COLLECT_MISSION_CHAT = "COLLECT_MISSION_CHAT",
  COLLECT_MISSION_CHAT_ROOM = "COLLECT_MISSION_CHAT_ROOM",
  COLLECT_MISSION_CLAIMED = "COLLECT_MISSION_CLAIMED",
  COLLECT_PROFILE = "COLLECT_PROFILE",
  COLLECT_TRACE_MISSION = "COLLECT_TRACE_MISSION",
  COLLECT_EXPLORE_MISSION = "COLLECT_EXPLORE_MISSION",
  COLLECT_EXPLORE_REDIRECTION = "COLLECT_EXPLORE_REDIRECTION",
  COLLECT_UPLOAD_FILE = "COLLECT_UPLOAD_FILE",
  COLLECT_QR_SCANNER = "COLLECT_QR_SCANNER",
  COLLECT_ITEMS_COLLECTED = "COLLECT_ITEMS_COLLECTED",
  COLLECT_AGGREGATED_QRCODE = "COLLECT_AGGREGATED_QRCODE",
  COLLECT_WALLET_DETAILS = "COLLECT_WALLET_DETAILS",
  VERIFY_AND_STORAGE = "VERIFY_AND_STORAGE",
  VERIFY_AND_STORAGE_HOME = "VERIFY_AND_STORAGE_HOME",
  VERIFY_AND_STORAGE_PROFILE = "VERIFY_AND_STORAGE_PROFILE",
  VERIFY_AND_STORAGE_CHAT = "VERIFY_AND_STORAGE_CHAT",
  VERIFY_AND_STORAGE_CHAT_ROOM = "VERIFY_AND_STORAGE_CHAT_ROOM",
  VERIFY_AND_STORAGE_WALLET = "VERIFY_AND_STORAGE_WALLET",
  VERIFY_CHECKING_STORER = "VERIFY_CHECKING_STORER",
  VERIFY_QR_SCANNER_HANDSHAKE = "VERIFY_QR_SCANNER_HANDSHAKE",
  VERIFY_QR_SCANNER_VERIFY = "VERIFY_QR_SCANNER_VERIFY",
  VERIFY_TRACK_ITEMS = "VERIFY_TRACK_ITEMS",
  VERIFY_AGGREGATED_CODES = "VERIFY_AGGREGATED_CODES",
  VERIFY_UPLOAD_IMAGE = "VERIFY_UPLOAD_IMAGE",
}

export type RootStackParamList = {
  HOME: undefined;
  CREATE_MISSION: undefined;
  CREATE_MISSION_CREATE: undefined;
  CREATE_MISSION_CREATED: undefined;
  CREATE_MISSION_SINGLE: { bounty: { id: string } };
  CREATE_MISSION_CHAT: { data: { isWithImage: boolean } };
  CREATE_MISSION_CHAT_ROOM: { room: Chat };
  CREATE_MISSION_ITEM_STATUS: undefined;
  CREATE_MISSION_ITEM_STATUS_COLLECTORS: undefined;
  CREATE_MISSION_ITEM_STATUS_STORERS: undefined;
  CREATE_MISSION_ITEM_LOG: undefined;
  CREATE_MISSION_DETAILS: undefined;
  CREATE_ITEM_IMAGES: undefined;
  CREATE_QR_SCANNER: undefined;
  CREATE_QR_SCANNER_RETURN: { bountyId: string };
  CREATE_TRACE_REPORT: undefined;
  COLLECT_MISSIONS: undefined;
  COLLECT_REGISTRATION: undefined;
  COLLECT_MISSIONS_ABOUT: { missionId: string };
  COLLECT_MISSION_CHAT: undefined;
  COLLECT_MISSION_CHAT_ROOM: { room: Chat };
  COLLECT_PROFILE: undefined;
  COLLECT_MISSION_SINGLE: { missionId: string };
  COLLECT_TRACE_MISSION: { missionId: string };
  COLLECT_MISSION_CLAIMED: undefined;
  COLLECT_EXPLORE_MISSION: undefined;
  COLLECT_EXPLORE_REDIRECTION: undefined;
  COLLECT_UPLOAD_FILE: { data: CollectorUploadFile };
  COLLECT_QR_SCANNER: undefined;
  COLLECT_ITEMS_COLLECTED: { missionId: string };
  COLLECT_AGGREGATED_QRCODE: undefined;
  COLLECT_WALLET_DETAILS: undefined;
  VERIFY_AND_STORAGE: undefined;
  VERIFY_AND_STORAGE_HOME: undefined;
  VERIFY_AND_STORAGE_PROFILE: undefined;
  VERIFY_AND_STORAGE_CHAT: undefined;
  VERIFY_AND_STORAGE_CHAT_ROOM: { room: Chat };
  VERIFY_CHECKING_STORER: undefined;
  VERIFY_QR_SCANNER_HANDSHAKE: undefined;
  VERIFY_QR_SCANNER_VERIFY: { bountyId: string };
  VERIFY_TRACK_ITEMS: undefined;
  VERIFY_AGGREGATED_CODES: undefined;
  VERIFY_UPLOAD_IMAGE: { data: StorerUploadFile };
  VERIFY_AND_STORAGE_WALLET: undefined;
};
