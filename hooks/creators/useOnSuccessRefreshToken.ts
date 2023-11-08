import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { setValueIntoSecureCode } from "lib/secureStore";
import { useAppSelector } from "redux/hooks";

type Props = {
  setAccessToken: (arg: string) => void;
};

const useOnSuccessRefreshToken = ({ setAccessToken }: Props) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, success } = useAppSelector(
    (state) => state.authRefreshToken,
  );

  useEffect(() => {
    const setUpdatedToken = async (token: string) => {
      await setValueIntoSecureCode(StorageType.ACCESS_TOKEN, token);
    };

    if (success && access_token) {
      setUpdatedToken(access_token);
      setAccessToken(access_token);
    }
  }, [success, access_token, setAccessToken]);
};

export { useOnSuccessRefreshToken };
