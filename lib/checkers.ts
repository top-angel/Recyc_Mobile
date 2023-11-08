import Toast from "react-native-toast-message";
import { StorersDoc } from "../redux/storers/storers.types";

type MissionCreate = {
  bounty: Bounty;
  itemsCount: number;
  startDate: Date;
  endDate: Date;
  image: string;
};

export const checkStorerApplication = (application: StorersDoc) => {
  if (!application.name) {
    Toast.show({
      type: "error",
      text1: "Name is required",
    });
    return false;
  }

  if (
    !application.address &&
    application.geocode.lat === 0 &&
    application.geocode.lng === 0
  ) {
    Toast.show({
      type: "error",
      text1: "Address is required",
    });
    return false;
  }

  if (!application.postalCode) {
    Toast.show({
      type: "error",
      text1: "Postal code is required",
    });
    return false;
  }

  if (!application.city) {
    Toast.show({
      type: "error",
      text1: "City is required",
    });
    return false;
  }

  if (!application.country) {
    Toast.show({
      type: "error",
      text1: "Country is required",
    });
    return false;
  }

  if (!application.openings) {
    Toast.show({
      type: "error",
      text1: "Opening hours is required",
    });
    return false;
  }

  if (application.storageSpace === 0) {
    Toast.show({
      type: "error",
      text1: "Storage space is required",
    });
    return false;
  }

  return true;
};

export const checkMissionCreate = ({
  bounty,
  itemsCount,
  startDate,
  endDate,
  image,
}: MissionCreate) => {
  if (!bounty.companyName) {
    Toast.show({
      type: "error",
      text1: "Company Name is required.",
    });
    return false;
  }

  if (!bounty.email) {
    Toast.show({
      type: "error",
      text1: "Email is required.",
    });
    return false;
  }

  if (!bounty.address) {
    Toast.show({
      type: "error",
      text1: "Address is required.",
    });
    return false;
  }

  if (!bounty.country) {
    Toast.show({
      type: "error",
      text1: "Country is required.",
    });
    return false;
  }

  if (!startDate) {
    Toast.show({
      type: "error",
      text1: "Start Date is required.",
    });
    return false;
  }

  if (!endDate) {
    Toast.show({
      type: "error",
      text1: "End Date is required.",
    });
    return false;
  }

  if (itemsCount === 0) {
    Toast.show({
      type: "error",
      text1: "Items count is required.",
    });
    return false;
  }

  if (!image) {
    Toast.show({
      type: "error",
      text1: "You have to upload image first.",
    });
    return false;
  }

  return true;
};
