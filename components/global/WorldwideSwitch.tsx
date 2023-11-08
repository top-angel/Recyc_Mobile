import { memo, FC } from "react";
import { Switch } from "react-native-elements";

type Props = {
  value: boolean;
  setValue: (value: boolean) => void;
};

const WorldwideSwitch: FC<Props> = ({ value, setValue }) => {
  return (
    <Switch
      value={value}
      trackColor={{ false: "#EDF1F9", true: "#78E2A9" }}
      thumbColor={value ? "#FFFFFF" : "#EDF1F9"}
      color="#072A46"
      ios_backgroundColor="#78E2A9"
      onValueChange={(newValue) => setValue(newValue)}
    />
  );
};

export default memo(WorldwideSwitch);
