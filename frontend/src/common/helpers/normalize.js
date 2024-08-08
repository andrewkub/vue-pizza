import doughSizes from "../data/doughSizes";
import sizes from "../data/sizes";

export const normalizeDough = (doughItems) =>
  doughItems.map((dough) => ({
    ...dough,
    value: doughSizes[dough.id],
  }));

export const normalizeSizes = (sizeItems) =>
  sizeItems.map((sizeItem) => ({
    ...sizeItem,
    value: sizes[sizeItem.id],
  }));
