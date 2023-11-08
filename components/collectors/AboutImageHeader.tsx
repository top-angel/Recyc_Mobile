import { View, Text, Image } from "react-native";
import { memo, FC } from "react";
import { useAppSelector } from "redux/hooks";
import { ROUTES } from "navigation/NavigationTypes";
import BackButton from "../header/BackButton";
import HeaderTitle from "../header/HeaderTitle";

const AboutImageHeader: FC = () => {
  const { result } = useAppSelector((state) => state.missionQueryPublic);

  const image = result[0]?.imageBase64;
  const imageName = result[0]?.imageName?.split(".")?.pop();

  return (
    <View className="opacity-90 bg-black relative justify-center z-10 overflow-hidden">
      {result[0]?.imageBase64 && result[0]?.imageName ? (
        <Image
          source={{
            uri: `data:image/${imageName};base64,${image}`,
          }}
          className="w-[450px] h-[350px] overflow-hidden object-cover"
        />
      ) : (
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/images/image_big.png")}
          className="w-[450px] h-[350px] overflow-hidden object-cover"
        />
      )}
      <View className="flex flex-row items-center absolute top-12 z-10">
        <BackButton />
        <View className="flex-1 justify-center items-center">
          <HeaderTitle navigateToHome={ROUTES.HOME} />
        </View>
      </View>

      <View className="absolute top-28 z-10 w-full p-2">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[24px] leading-[36px] font-extrabold text-[#FFF] text-center"
        >
          {result[0]?.bounty_name}
        </Text>
      </View>
    </View>
  );
};

export default memo(AboutImageHeader);
