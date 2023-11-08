import { useEffect } from "react";
import { getAggregatedItemsByWallet } from "redux/bounties/bountyClaimedByWallet/bountyClaimedByWallet.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  page: number;
  perPage: number;
  publicAddress: string;
};

const useFetchDataOnLoadByWallet = ({
  page,
  perPage,
  publicAddress,
}: Props) => {
  const { result, success } = useAppSelector((state) => state.missionGetById);
  const { loading: loadingByWallet } = useAppSelector(
    (state) => state.bountyClaimedByWallet,
  );
  const { loading: loadingReturn, success: successReturn } = useAppSelector(
    (state) => state.bountyReturnItem,
  );
  const dispatch = useAppDispatch();

  const loading = loadingByWallet || loadingReturn;

  useEffect(() => {
    if (success && result.length > 0 && publicAddress) {
      dispatch(
        getAggregatedItemsByWallet({
          page,
          perPage,
          sort: "createdAt",
          order: "desc",
          owner: publicAddress,
          bountyId: result[0].id,
        }),
      );
    }
  }, [success, dispatch, page, perPage, publicAddress, result, successReturn]);

  return { loading };
};

export { useFetchDataOnLoadByWallet };
