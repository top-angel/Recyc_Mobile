import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { memo, FC, useState, useEffect } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import { useAppSelector } from "../redux/hooks";

const CreatorItemImages: FC = () => {
  const [totalImg, setTotalImg] = useState<number>(0);
  const [currentImg, setCurrentImg] = useState<number>(0);

  const { images, success } = useAppSelector(
    (state) => state.missionGetBountyImages,
  );

  const imageUrl =
    "https://crab.recyclium.dataunion.app/api/v1/get-image-by-id?id=";

  useEffect(() => {
    if (success) {
      setTotalImg(images.length);
      setCurrentImg(1);
    }
  }, [success, images.length]);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <ScrollView className="flex-1 p-0 bg-01-creator-dark">
        <SingleMissionImageHeader />

        <View className="p-4 bg-01-creator-dark flex-1 rounded-[20px] -mt-7 z-20">
          {success && images.length > 0 ? (
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
              >
                Images
              </Text>
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[16px] leading-[36px] font-medium text-[#FFFFFF]"
              >
                {currentImg} of {totalImg}
              </Text>
            </View>
          ) : null}
        </View>

        {success && images.length === 0 ? (
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] font-medium text-[#FFFFFF] text-center"
          >
            There is no uploaded images
          </Text>
        ) : null}

        <View className="p-4 space-y-4 justify-center items-center">
          {images.map((image) => (
            <Image
              key={image}
              source={{ uri: `${imageUrl}${image}` }}
              className="h-[250px] w-[300px]"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CreatorItemImages);
