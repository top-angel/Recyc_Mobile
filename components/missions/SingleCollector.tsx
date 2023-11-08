import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo, useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getBountyImages } from "redux/missions/missionGetBountyImages/missionGetBountyImages.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type Props = {
  item: Collectors;
  itemId: string;
  setItemId: (arg: string) => void;
  accessToken: string | undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_ITEM_STATUS_COLLECTORS
>;

const SingleCollector: FC<Props> = ({
  item,
  setItemId,
  itemId,
  accessToken,
}) => {
  const navigate = useNavigation<NavigationProp>();

  const { result } = useAppSelector((state) => state.missionGetById);
  const dispatch = useAppDispatch();

  const handlePress = useCallback(
    (id: string) => {
      if (itemId === id) {
        setItemId("");
      } else {
        setItemId(id);
      }
    },
    [setItemId, itemId],
  );

  const handleListImages = useCallback(() => {
    if (accessToken && result?.[0]?.id) {
      navigate.navigate(ROUTES.CREATE_ITEM_IMAGES);
      dispatch(getBountyImages({ accessToken, bountyId: result?.[0]?.id }));
    }
  }, [navigate, accessToken, dispatch, result]);

  return (
    <TouchableOpacity
      className="p-4 bg-01-creator-light-secondary rounded-[12px] mb-4"
      style={{
        borderColor: itemId === item.id ? "#86B6B9" : "",
        borderWidth: itemId === item.id ? 3 : 0,
        borderRadius: itemId === item.id ? 12 : 0,
      }}
      onPress={() => handlePress(item.id)}
    >
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] text-01-creator-dark font-medium"
        >
          {item?.name}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
        >
          {item?.address}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] text-01-creator-dark font-bold"
          >
            {item?.collected}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-medium ml-2"
          >
            Collected
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] text-01-creator-dark font-bold"
          >
            {item?.rewarded}$
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-medium ml-2"
          >
            Rewarded
          </Text>
        </View>
      </View>

      <View
        className={
          itemId !== item.id
            ? "hidden transition-all ease-in-out duration-700"
            : "flex flex-row items-center justify-between transition-all ease-in-out duration-700 mt-2"
        }
      >
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            Last Scan:
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-bold ml-2"
          >
            2 Days ago
          </Text>
        </View>

        <TouchableOpacity onPress={handleListImages}>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            See images
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SingleCollector);
