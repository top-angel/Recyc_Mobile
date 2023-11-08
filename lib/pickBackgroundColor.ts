import { ColorSchema } from "../enums/colorSchema";

const pickBackgroundColor = (index: number) => {
  if (index === 0) {
    return ColorSchema.CREATOR_COLOR;
  }

  if (index === 1) {
    return ColorSchema.STORER_COLOR;
  }

  if (index === 2) {
    return ColorSchema.COLLECTOR_COLOR;
  }

  return ColorSchema.CREATOR_COLOR;
};

export { pickBackgroundColor };
