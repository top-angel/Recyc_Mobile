import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateMissionImage } from "redux/missions/missionGetById/missionGetById.slice";

const useUpdateMissionWithImage = () => {
  const { image, name, success } = useAppSelector(
    (state) => state.missionGetImage,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success && name) {
      setTimeout(() => {
        dispatch(updateMissionImage({ imageBase64: image, imageName: name }));
      }, 2000);
    }
  }, [success, image, dispatch, name]);
};

export { useUpdateMissionWithImage };
