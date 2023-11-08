import { useEffect } from "react";
import { getAllAggregatesByWallet } from "redux/bounties/bountiesGetAllAggregated/bountiesGetAllAggregated.action";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  page: number;
  perPage: number;
  publicAddress: string;
};

const useFetchAggregatedItemsOnLoad = ({
  page,
  perPage,
  publicAddress,
}: Props) => {
  const { loading: loadingAll } = useAppSelector(
    (state) => state.bountiesGetAllAggregates,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (publicAddress) {
      dispatch(
        getAllAggregatesByWallet({
          walletAddress: publicAddress,
          page,
          perPage,
          sort: "createdAt",
          order: "desc",
        }),
      );
    }
  }, [dispatch, publicAddress, page, perPage]);

  return { loading: loadingAll };
};

export { useFetchAggregatedItemsOnLoad };
