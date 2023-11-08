import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetCreateMission } from "redux/creators/creatorCreateMission/creatorCreateMission.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_CREATE
>;

const useRedirectToCreatedMissions = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success } = useAppSelector((state) => state.creatorMissionNew);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.CREATE_MISSION_CREATED);
      dispatch(resetCreateMission());
    }
  }, [dispatch, navigate, success]);
};

export { useRedirectToCreatedMissions };
