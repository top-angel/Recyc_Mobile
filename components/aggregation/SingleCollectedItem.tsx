import { View, Text } from "react-native";
import { FC, memo } from "react";
import Checkbox from "expo-checkbox";
import { BountyAggregatedDoc } from "redux/bounties/bountyAggregated.types";

type Props = {
  item: BountyAggregatedDoc;
  selected: string[];
  setSelected: (arg: string[]) => void;
};

const SingleCollectedItem: FC<Props> = ({ item, selected, setSelected }) => {
  const handleCheckbox = () => {
    const list = [...selected];
    const clickedItem = list.indexOf(item.serialNumber);
    if (clickedItem === -1) {
      list.push(item.serialNumber);
    } else {
      list.splice(clickedItem, 1);
    }

    setSelected(list);
  };

  return (
    <View className="p-4 bg-[#E3EAEF] mb-4 rounded-[12px]">
      <View
        className={
          !item?.isUsedByCollector
            ? "flex flex-row items-center justify-between"
            : "flex flex-row items-center justify-end"
        }
      >
        {!item?.isUsedByCollector ? (
          <Checkbox
            className="rounded-[10px]"
            color="#1C3C59"
            value={selected.includes(item.serialNumber)}
            onValueChange={handleCheckbox}
          />
        ) : null}
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[13px] leading-[36px] font-normal text-[#1C3C59]"
        >
          {item?.serialNumber.substring(0, 25)}...
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between mt-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-normal text-[#1C3C59]"
        >
          {item?.companyName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-bold text-[#1C3C59]"
        >
          {item?.status}
        </Text>
      </View>
    </View>
  );
};

export default memo(SingleCollectedItem);
