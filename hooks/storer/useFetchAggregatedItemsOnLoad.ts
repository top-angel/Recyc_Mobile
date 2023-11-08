import { useEffect } from "react";
import { getAllStorerBountyItems } from "redux/bounties/bountyGetAllByStorer/bountyGetAllByStorer.action";
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
    (state) => state.bountyGetStorerItems,
  );
  const { loading: loadingVerify, success: successVerify } = useAppSelector(
    (state) => state.bountyVerifyItem,
  );
  const dispatch = useAppDispatch();

  const loading = loadingAll || loadingVerify;

  useEffect(() => {
    if (publicAddress) {
      dispatch(
        getAllStorerBountyItems({
          page,
          perPage,
          sort: "createdAt",
          order: "desc",
          walletAddress: publicAddress,
        }),
      );
    }
  }, [dispatch, page, perPage, publicAddress, successVerify]);

  return { loading };
};

export { useFetchAggregatedItemsOnLoad };
