import "react-native-get-random-values";
import "@ethersproject/shims";
import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import { id } from "ethers/lib/utils";

type Props = {
  privateKey: string;
};

const useCreateEthAccount = ({ privateKey }: Props) => {
  const [publicAddress, setPublicAddress] = useState<string>("");

  useEffect(() => {
    if (privateKey) {
      const wallet = new Wallet(id(privateKey));

      setPublicAddress(wallet.address);
    }
  }, [privateKey]);

  return { publicAddress };
};

export { useCreateEthAccount };
