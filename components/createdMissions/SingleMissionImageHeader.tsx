import { View, Image } from "react-native";
import { memo, FC } from "react";
import { ROUTES } from "navigation/NavigationTypes";
import { useAppSelector } from "redux/hooks";
import BackButton from "../header/BackButton";
import HeaderTitle from "../header/HeaderTitle";

const SingleMissionImageHeader: FC = () => {
  const { result } = useAppSelector((state) => state.missionGetById);

  const image = result?.[0]?.imageBase64;
  const imageName = result?.[0]?.imageName?.split(".")?.pop();

  return (
    <View className="opacity-90 bg-black relative justify-center z-10 overflow-hidden">
      {result?.[0]?.imageBase64 && result?.[0]?.imageName ? (
        <Image
          source={{
            uri: `data:image/${imageName};base64,${image}`,
          }}
          className="w-[450px] h-[160px] overflow-hidden object-center"
        />
      ) : (
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/images/Image.png")}
          className="w-[450px] h-[160px] overflow-hidden object-center"
        />
      )}
      <View className="flex flex-row items-center absolute z-10">
        <BackButton />
        <View className="flex-1 justify-center items-center">
          <HeaderTitle navigateToHome={ROUTES.HOME} />
        </View>
      </View>
    </View>
  );
};

export default memo(SingleMissionImageHeader);
