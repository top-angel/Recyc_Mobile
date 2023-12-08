import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { setValueIntoSecureCode } from "lib/secureStore";
import { useAppSelector } from "redux/hooks";

const useSetTokens = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { status, access_token, refresh_token } = useAppSelector(
    (state) => state.authStorerLogin,
  );

  useEffect(() => {
    console.log("------- Create Storer Token -------", access_token);
    const secureToStore = async (token: string, refresh: string) => {
      await setValueIntoSecureCode(StorageType.ACCESS_STORER_TOKEN, token);
    };

    if (status === "success") {
      secureToStore(access_token, refresh_token);
    }
  }, [access_token, refresh_token, status]);
};

export { useSetTokens };
