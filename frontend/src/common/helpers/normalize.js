import doughSizes from "../data/doughSizes";
import sizes from "../data/sizes";
import ingredients from "../data/ingredients";
import sauces from "../data/sauces";

export const normalizeDough = (dough) => ({
  ...dough,
  value: doughSizes[dough.id],
});

export const normalizeSize = (size) => ({
  ...size,
  value: sizes[size.id],
});

export const normalizeIngredient = (ingredient) => ({
  ...ingredient,
  value: ingredients[ingredient.id],
});

export const normalizeSauce = (sauce) => ({
  ...sauce,
  value: sauces[sauce.id],
});
