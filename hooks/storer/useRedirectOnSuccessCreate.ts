import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { resetStorerCreate } from "redux/storers/storerCreateNew/storerCreateNew.slice";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE
>;

const useRedirectOnSuccessCreate = () => {
  const navigate = useNavigation<NavigationProp>();

  const { loading, success } = useAppSelector((state) => state.storerCreateNew);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate.navigate(ROUTES.VERIFY_AND_STORAGE_HOME);
      dispatch(resetStorerCreate());
    }
  }, [success, navigate, dispatch]);

  return { loading };
};

export { useRedirectOnSuccessCreate };
