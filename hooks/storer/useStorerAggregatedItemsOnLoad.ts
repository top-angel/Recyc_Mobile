import { useEffect } from "react";
import { getAllAggregatesByWallet } from "redux/bounties/bountiesGetAllAggregated/bountiesGetAllAggregated.action";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  page: number;
  perPage: number;
  publicAddress: string;
};

const useStorerAggregatedItemsOnLoad = ({
  page,
  perPage,
  publicAddress,
}: Props) => {
  const { loading } = useAppSelector((state) => state.bountiesGetAllAggregates);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (publicAddress) {
      dispatch(
        getAllAggregatesByWallet({
          page,
          perPage,
          sort: "createdAt",
          order: "desc",
          walletAddress: publicAddress,
        }),
      );
    }
  }, [publicAddress, dispatch, page, perPage]);

  return { loading };
};

export { useStorerAggregatedItemsOnLoad };
