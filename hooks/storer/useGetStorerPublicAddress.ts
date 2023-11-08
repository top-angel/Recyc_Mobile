import "react-native-get-random-values";
import "@ethersproject/shims";
import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

const useGetStorerPublicAddress = () => {
  const [publicAddress, setPublicAddress] = useState<string>("");

  useEffect(() => {
    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_STORER,
      );

      const wallet = new Wallet(id(result));
      setPublicAddress(wallet.address);
    };

    getSecureStore();
  }, []);

  return { publicAddress };
};

export { useGetStorerPublicAddress };
