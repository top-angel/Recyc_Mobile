import { ReactElement } from "react";
import { ColorSchema } from "enums/colorSchema";
import { ROUTES } from "navigation/NavigationTypes";
import NoGpsIcon from "../icons/NoGpsIcon";
import NoImagesIcon from "../icons/NoImagesIcon";
import NoResultIcon from "../icons/NoResultIcon";
import CollectMissionLine from "./CollectMissionLine";
import CreateMissionLine from "./CreateMissionLine";
import VerifyAndStorageLine from "./VerifyAndStorageLine";

export type Item = {
  id: string;
  icon: ReactElement<any, any>;
  subIcon: ReactElement<any, any>;
  screenTitle: string;
  buttonTitle: string;
  route: ROUTES;
  backgroundColor: string;
  buttonBackground: string;
};

export const slides: Item[] = [
  {
    id: "1",
    icon: <NoResultIcon />,
    subIcon: <CreateMissionLine />,
    screenTitle: "Create missions",
    buttonTitle: "Start as a Mission Creator",
    route: ROUTES.CREATE_MISSION,
    backgroundColor: ColorSchema.CREATOR_COLOR,
    buttonBackground: "#4B6465",
  },
  {
    id: "2",
    icon: <NoGpsIcon />,
    subIcon: <VerifyAndStorageLine />,
    screenTitle: "Verify & Storage",
    buttonTitle: "Start as Storer",
    route: ROUTES.VERIFY_CHECKING_STORER,
    backgroundColor: ColorSchema.STORER_COLOR,
    buttonBackground: ColorSchema.STORER_COLOR,
  },
  {
    id: "3",
    icon: <NoImagesIcon />,
    subIcon: <CollectMissionLine />,
    screenTitle: "Collect Missions",
    buttonTitle: "Start as a Collector",
    route: ROUTES.COLLECT_MISSIONS,
    backgroundColor: ColorSchema.COLLECTOR_COLOR,
    buttonBackground: ColorSchema.COLLECTOR_COLOR,
  },
];

export const pickHeaderColor = (index: number) => {
  if (index === 0) {
    return ColorSchema.CREATOR_COLOR;
  }

  if (index === 1) {
    return ColorSchema.COLLECTOR_COLOR;
  }

  if (index === 2) {
    return ColorSchema.STORER_COLOR;
  }

  return "";
};
