import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

type Props = {
  setIsRegistered: (arg: boolean) => void;
};

const useCheckUserRegistered = ({ setIsRegistered }: Props) => {
  useEffect(() => {
    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.IS_REGISTERED_COLLECTOR,
      );
      if (result) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    };

    getSecureStore();
  }, [setIsRegistered]);
};

export { useCheckUserRegistered };
