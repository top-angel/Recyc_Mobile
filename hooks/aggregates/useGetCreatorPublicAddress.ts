import "react-native-get-random-values";
import "@ethersproject/shims";
import { Wallet, providers } from "ethers";
import { useEffect, useState } from "react";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

const useGetCreatorPublicAddress = () => {
  const [publicAddress, setPublicAddress] = useState<string>("");

  useEffect(() => {
    const provider = new providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/v1/1f39eb5db31772866f3ab97009148013cc566bb9",
    );

    const getSecureStore = async () => {
      const result = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_CREATOR,
      );

      const wallet = new Wallet(result, provider);
      setPublicAddress(wallet.address);
    };

    getSecureStore();
  }, []);

  return { publicAddress };
};

export { useGetCreatorPublicAddress };
