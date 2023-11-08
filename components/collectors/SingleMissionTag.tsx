import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";

type Props = {
  tag: Tag;
  tagIds: string[];
  setTagIds: (arg: string[]) => void;
};

const SingleMissionTag: FC<Props> = ({ tag, tagIds, setTagIds }) => {
  const handleTag = (id: string) => {
    const list = [...tagIds];
    const clicked = tagIds.indexOf(id);
    if (clicked === -1) {
      list.push(id);
    } else {
      list.splice(clicked, 1);
    }
    setTagIds(list);
  };

  return (
    <TouchableOpacity onPress={() => handleTag(tag.id)}>
      <View
        style={{
          backgroundColor: tagIds.includes(tag.id) ? "#2E6297" : "#F7F7F7",
        }}
        className="px-3 py-4 rounded-[20px]"
      >
        <Text
          style={{
            fontFamily: "Nunito",
            color: tagIds.includes(tag.id) ? "#FFFFFF" : "#8A8A8A",
          }}
          className="text-[12px] leading-[20px] font-medium"
        >
          {tag.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SingleMissionTag);
