import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updatePublicMissionImage } from "redux/missions/missionQueryPublic/missionQueryPublic.slice";

const useUpdatePublicMissionWithImage = () => {
  const { image, name, success } = useAppSelector(
    (state) => state.missionGetImage,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success && name) {
      setTimeout(() => {
        dispatch(
          updatePublicMissionImage({ imageBase64: image, imageName: name }),
        );
      }, 2000);
    }
  }, [success, image, dispatch, name]);
};

export { useUpdatePublicMissionWithImage };
