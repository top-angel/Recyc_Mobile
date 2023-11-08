import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getMissionsByUser } from "redux/missions/missionGetByUser/missionGetByUser.actions";

const useFetchMissionsOnLoad = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, success: successLogin } = useAppSelector(
    (state) => state.authLogin,
  );
  const { success: successNewMission } = useAppSelector(
    (state) => state.creatorMissionNew,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (successLogin && access_token) {
      dispatch(
        getMissionsByUser({
          accessToken: access_token,
        }),
      );
    }
  }, [successLogin, access_token, dispatch, successNewMission]);
};

export { useFetchMissionsOnLoad };
