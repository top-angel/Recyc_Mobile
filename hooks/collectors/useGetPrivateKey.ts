import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";
import { useAppSelector } from "redux/hooks";

type Props = {
  setPrivateKey: (arg: string) => void;
};

const useGetPrivateKey = ({ setPrivateKey }: Props) => {
  const { loading: loadingRegister } = useAppSelector(
    (state) => state.authRegister,
  );
  const { loading: loadingLogin } = useAppSelector((state) => state.authLogin);
  const { loading: loadingNonce } = useAppSelector(
    (state) => state.authGetNonce,
  );
  const { loading: loadingMissions } = useAppSelector(
    (state) => state.missionsGetInProgress,
  );

  const loading =
    loadingRegister || loadingLogin || loadingNonce || loadingMissions;

  useEffect(() => {
    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_COLLECTOR,
      );

      setPrivateKey(result);
    };

    getSecureStore();
  }, [setPrivateKey]);

  return { loading };
};

export { useGetPrivateKey };
