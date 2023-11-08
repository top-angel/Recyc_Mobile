import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetClaimAggregatedItems } from "redux/bounties/bountiesClaimAggregation/bountiesClaimAggregation.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_QR_SCANNER
>;

const useRedirectOnCreatorClaimed = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success } = useAppSelector((state) => state.bountyClaimAggregation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.CREATE_MISSION_SINGLE);
      dispatch(resetClaimAggregatedItems());
    }
  }, [success, navigate, dispatch]);
};

export { useRedirectOnCreatorClaimed };
