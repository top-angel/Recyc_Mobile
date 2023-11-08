import { useEffect } from "react";
import { countBountyItemsByWallet } from "redux/bounties/bountyCountByWallet/bountyCountByWallet.action";
import { useAppDispatch } from "redux/hooks";

type Props = {
  publicAddress: string;
};

const useCountTotalReturnedItems = ({ publicAddress }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (publicAddress) {
      dispatch(countBountyItemsByWallet({ walletAddress: publicAddress }));
    }
  }, [publicAddress, dispatch]);
};

export { useCountTotalReturnedItems };
