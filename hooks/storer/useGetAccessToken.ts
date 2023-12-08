import { useEffect, useState } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

const useGetAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const accessTok = await getValueFromSecureStore(
        StorageType.ACCESS_STORER_TOKEN,
      );

      if (accessTok) {
        setAccessToken(accessTok);
      }
    };

    getTokenFromStorage();
  }, []);

  return { accessToken };
};

export { useGetAccessToken };
