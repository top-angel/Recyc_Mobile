import { useEffect } from "react";
import { getAllStorerBountyItems } from "redux/bounties/bountyGetAllByStorer/bountyGetAllByStorer.action";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getStorerProfile } from "redux/storers/storerGetProfile/storerGetProfile.action";

type Props = {
  accessToken: string;
  publicAddress: string;
};

const useFetchStorerProfileOnLoad = ({ accessToken, publicAddress }: Props) => {
  const { loading: loadingProfile } = useAppSelector(
    (state) => state.storerGetProfile,
  );
  const { loading: loadingStorerItems } = useAppSelector(
    (state) => state.bountyGetStorerItems,
  );
  const dispatch = useAppDispatch();

  const loading = loadingStorerItems || loadingProfile;

  useEffect(() => {
    if (publicAddress) {
      Promise.all([
        dispatch(getStorerProfile({ accessToken })),
        dispatch(
          getAllStorerBountyItems({
            page: 0,
            perPage: 10,
            sort: "createdAt",
            order: "desc",
            walletAddress: publicAddress,
          }),
        ),
      ]);
    }
  }, [publicAddress, dispatch, accessToken]);

  return { loading };
};

export { useFetchStorerProfileOnLoad };
