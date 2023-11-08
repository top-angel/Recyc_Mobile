import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { searchStorersByGeolocation } from "redux/storers/storerSearchGeolocation/storerSearchGeolocation.action";

const useFetchAllStorersByGeolocation = () => {
  const { geolocation } = useAppSelector((state) => state.globalSetGeolocation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (geolocation) {
      dispatch(
        searchStorersByGeolocation({ geocode: geolocation, distance: 50 }),
      );
    }
  }, [geolocation, dispatch]);
};

export { useFetchAllStorersByGeolocation };
