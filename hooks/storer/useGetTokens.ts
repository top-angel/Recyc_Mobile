import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";
import { useAppSelector } from "redux/hooks";

type Props = {
  setAccessToken: (arg: string) => void;
  setRefreshToken: (arg: string) => void;
};

const useGetTokens = ({ setAccessToken, setRefreshToken }: Props) => {
  const { success: successRefresh } = useAppSelector(
    (state) => state.authRefreshToken,
  );

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const accessTok = await getValueFromSecureStore(
        StorageType.ACCESS_STORER_TOKEN,
      );
      const refreshTok = await getValueFromSecureStore(
        StorageType.REFRESH_TOKEN,
      );

      if (accessTok) {
        setAccessToken(accessTok);
      }

      if (refreshTok) {
        setRefreshToken(refreshTok);
      }
    };

    getTokenFromStorage();
  }, [successRefresh, setAccessToken, setRefreshToken]);
};

export { useGetTokens };
