import { useEffect } from "react";
import { getValueFromSecureStore } from "lib/secureStore";
import { StorageType } from "enums/storageTypes";

type Props = {
  setPrivateKey: (arg: string) => void;
  setPublicAddress: (arg: string) => void;
};

const useGetKeys = ({ setPrivateKey, setPublicAddress }: Props) => {
  useEffect(() => {
    const getSecureStore = async () => {
      const privateKey = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_COLLECTOR,
      );
      const publicAddress = await getValueFromSecureStore(
        StorageType.PUBLIC_ADDRESS_COLLECTOR,
      );

      setPrivateKey(privateKey);
      setPublicAddress(publicAddress);
    };

    getSecureStore();
  }, [setPrivateKey, setPublicAddress]);
};

export { useGetKeys };
