import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { resetStorerCheck } from "redux/storers/storerCheck/storerCheck.slice";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_CHECKING_STORER
>;

const useRedirectStorer = () => {
  const navigate = useNavigation<NavigationProp>();

  const { success, exists, loading } = useAppSelector(
    (state) => state.storerCheck,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success && exists) {
      navigate.navigate(ROUTES.VERIFY_AND_STORAGE_HOME);
      dispatch(resetStorerCheck());
    }

    if (success && !exists) {
      navigate.navigate(ROUTES.VERIFY_AND_STORAGE);
      dispatch(resetStorerCheck());
    }
  }, [exists, dispatch, navigate, success]);

  return { loading };
};

export { useRedirectStorer };
