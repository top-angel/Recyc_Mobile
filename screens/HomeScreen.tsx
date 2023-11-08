import { View, FlatList } from "react-native";
import { memo, FC, useRef, useCallback } from "react";
import { slides } from "../components/home/chooseMission.types";
import ChooseMission from "../components/home/ChooseMission";
import { useCheckPrivateKey } from "../hooks/home/useCheckPrivateKey";
import { setScreenBackground } from "../redux/global/globalSetColor/globalScreenColor.slice";
import { useAppDispatch } from "../redux/hooks";
import { pickBackgroundColor } from "../lib/pickBackgroundColor";

const HomeScreen: FC = () => {
  const flatListRef = useRef(null);

  const dispatch = useAppDispatch();

  /** CHECK PRIVATE KEYS FOR CREATOR AND COLLECTOR */
  /** ON FIRST LOAD, WE WILL GENERATE PRIVATE KEYS FOR COLLECTOR AND CREATOR */
  useCheckPrivateKey();

  const viewableItemsChanged = useCallback(
    ({ viewableItems, changed }) => {
      if (changed && changed.length > 1) {
        dispatch(
          setScreenBackground({
            backgroundColor: pickBackgroundColor(viewableItems[0].index),
          }),
        );
      }
    },
    [dispatch],
  );

  const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  };

  // useEffect(() => {
  //   const removeStore = async () => {
  //     console.log("removing store...");
  //     await removeValueFromSecureStore(StorageType.IS_REGISTERED);
  //     await removeValueFromSecureStore(StorageType.PRIVATE_KEY_CREATOR);
  //     await removeValueFromSecureStore(StorageType.PUBLIC_ADDRESS_CREATOR);
  //     await removeValueFromSecureStore(StorageType.IS_REGISTERED_COLLECTOR);
  //     await removeValueFromSecureStore(StorageType.IS_REGISTERED_STORER);
  //     await removeValueFromSecureStore(StorageType.PRIVATE_KEY_COLLECTOR);
  //     await removeValueFromSecureStore(StorageType.PRIVATE_KEY_STORER);
  //     await removeValueFromSecureStore(StorageType.PUBLIC_ADDRESS_COLLECTOR);
  //     await removeValueFromSecureStore(StorageType.ACCESS_TOKEN);
  //     await removeValueFromSecureStore(StorageType.REFRESH_TOKEN);
  //     console.log("removed");
  //   };

  //   removeStore();
  // }, []);

  return (
    <View className="flex-1">
      <FlatList
        data={slides}
        renderItem={({ item }) => <ChooseMission item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />
    </View>
  );
};

export default memo(HomeScreen);
