import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetVerifyBountyItem } from "redux/bounties/bountyVerifyItem/bountyVerifyItem.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_QR_SCANNER_VERIFY
>;

const useRedirectOnSuccessVerification = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success, loading } = useAppSelector(
    (state) => state.bountyVerifyItem,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.VERIFY_TRACK_ITEMS);
      dispatch(resetVerifyBountyItem());
    }
  }, [success, navigate, dispatch]);

  return { loading };
};

export { useRedirectOnSuccessVerification };
