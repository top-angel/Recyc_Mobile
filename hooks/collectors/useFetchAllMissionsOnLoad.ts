import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getAllMissions } from "redux/missions/missionsGetAll/missionsGetAll.actions";
import { getAllLinks } from "redux/links/linkGetAll/linkGetAll.actions";

const useFetchAllMissionsOnLoad = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, success: successLogin } = useAppSelector(
    (state) => state.authLogin,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (successLogin && access_token) {
      Promise.all([
        dispatch(
          getAllMissions({
            accessToken: access_token,
          }),
        ),
        dispatch(getAllLinks()),
      ]);
    }
  }, [successLogin, access_token, dispatch]);

  return { accessToken: access_token };
};

export { useFetchAllMissionsOnLoad };
