import { useEffect } from "react";
import { setGeoLocation } from "redux/global/globalGetLocation/globalGetLocation.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const useGetLocation = () => {
  const { loading: loadingUploadImage } = useAppSelector(
    (state) => state.creatorUploadImage,
  );

  const dispatch = useAppDispatch();

  const loading = loadingUploadImage;

  useEffect(() => {
    dispatch(setGeoLocation());
  }, [dispatch]);

  return { loading };
};

export { useGetLocation };
