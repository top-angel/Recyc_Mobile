import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getMissionImage } from "redux/missions/missionGetImage/missionGetImage.actions";

type Props = {
  accessToken: string;
};

const useFetchPublicMissionImage = ({ accessToken }: Props) => {
  const {
    success,
    result,
    loading: loadingById,
  } = useAppSelector((state) => state.missionQueryPublic);
  const { loading: loadingImage } = useAppSelector(
    (state) => state.missionGetImage,
  );
  const dispatch = useAppDispatch();

  const loading = loadingImage || loadingById;

  useEffect(() => {
    if (accessToken && success && result.length > 0) {
      dispatch(
        getMissionImage({
          accessToken,
          id: result?.[0]?.sample_data_list?.[0],
        }),
      );
    }
  }, [accessToken, success, result, dispatch]);

  return { loading };
};

export { useFetchPublicMissionImage };
