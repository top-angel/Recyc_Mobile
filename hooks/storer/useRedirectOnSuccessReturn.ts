import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetReturnBountyItem } from "redux/bounties/bountyReturnItem/bountyReturnItem.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_QR_SCANNER_RETURN
>;

const useRedirectOnSuccessReturn = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success, loading } = useAppSelector(
    (state) => state.bountyReturnItem,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.CREATE_TRACE_REPORT);
      dispatch(resetReturnBountyItem());
    }
  }, [success, navigate, dispatch]);

  return { loading };
};

export { useRedirectOnSuccessReturn };
