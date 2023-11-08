import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetBountyClaimAsCollector } from "redux/bounties/bountyClaimAsCollector/bountyClaimAsCollector.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_ITEMS_COLLECTED
>;

const useRedirectOnSuccessAggregation = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success } = useAppSelector((state) => state.bountyClaimAsCollector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.COLLECT_AGGREGATED_QRCODE);
      dispatch(resetBountyClaimAsCollector());
    }
  }, [success, navigate, dispatch]);
};

export { useRedirectOnSuccessAggregation };
