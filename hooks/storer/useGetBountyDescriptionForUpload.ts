import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { queryMissionForPublic } from "redux/missions/missionQueryPublic/missionQueryPublic.actions";

type Props = {
  accessToken: string | undefined;
};

const useGetBountyDescriptionForUpload = ({ accessToken }: Props) => {
  const { success, bountyItem } = useAppSelector(
    (state) => state.bountyGetBySerNumber,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success && bountyItem && accessToken) {
      dispatch(
        queryMissionForPublic({
          id: bountyItem.bountyId,
          accessToken,
        }),
      );
    }
  }, [success, bountyItem, dispatch, accessToken]);
};

export { useGetBountyDescriptionForUpload };
