import { useEffect, useState } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

const useGetPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState<string>();

  useEffect(() => {
    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_STORER,
      );

      setPrivateKey(result);
    };

    getSecureStore();
  }, []);

  return { privateKey };
};

export { useGetPrivateKey };
