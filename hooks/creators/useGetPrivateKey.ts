import { useEffect, useState } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";
import { useAppSelector } from "redux/hooks";

const useGetPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState<string>("");

  const { loading: loadingRegister } = useAppSelector(
    (state) => state.authRegister,
  );
  const { loading: loadingLogin } = useAppSelector((state) => state.authLogin);
  const { loading: loadingNonce } = useAppSelector(
    (state) => state.authGetNonce,
  );
  const { loading: loadingCreate } = useAppSelector(
    (state) => state.creatorMissionNew,
  );
  const { loading: loadingByUser } = useAppSelector(
    (state) => state.missionsGetByUser,
  );

  const loading =
    loadingRegister ||
    loadingNonce ||
    loadingLogin ||
    loadingCreate ||
    loadingByUser;

  useEffect(() => {
    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_CREATOR,
      );

      setPrivateKey(result);
    };

    getSecureStore();
  }, []);

  return { privateKey, loading };
};

export { useGetPrivateKey };
