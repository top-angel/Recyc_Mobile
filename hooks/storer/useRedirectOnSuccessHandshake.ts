import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { resetHandshake } from "redux/bounties/bountyHandshakeAsStorer/bountyHandshakeAsStorer.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_QR_SCANNER_HANDSHAKE
>;

const useRedirectOnSuccessHandshake = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success, loading } = useAppSelector(
    (state) => state.bountyHandshakeAsStorer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.VERIFY_TRACK_ITEMS);
      dispatch(resetHandshake());
    }
  }, [success, dispatch, navigate]);

  return { loading };
};

export { useRedirectOnSuccessHandshake };
