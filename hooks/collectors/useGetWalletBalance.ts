import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { useEffect } from "react";
import erc20ABI, { ERC20Contract } from "components/abis/erc20";

type Props = {
  publicAddress: string;
  setBalance: (arg: string) => void;
};

const useGetWalletBalance = ({ publicAddress, setBalance }: Props) => {
  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://rpc-mainnet.maticvigil.com/v1/1f39eb5db31772866f3ab97009148013cc566bb9",
      );

      const USDTcontract = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
      const contract = new ethers.Contract(USDTcontract, erc20ABI, provider);
      const balance = await contract.balanceOf(publicAddress);
      const balanceFormat = ethers.formatEther(balance);
      setBalance(balanceFormat * 1000000000000);
    };

    if (publicAddress) {
      getBalance();
    }
  }, [publicAddress, setBalance]);
};

export { useGetWalletBalance };
