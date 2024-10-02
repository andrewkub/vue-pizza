<script setup>
import { computed, reactive } from "vue";

import {
  normalizeDough,
  normalizeSize,
  normalizeIngredient,
  normalizeSauce,
} from "../common/helpers/normalize";

import doughJSON from "../mocks/dough.json";
import ingredientsJSON from "../mocks/ingredients.json";
import saucesJSON from "../mocks/sauces.json";
/*import misc from "../mocks/misc.json";*/
import sizesJSON from "../mocks/sizes.json";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/SizeSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaView from "@/modules/constructor/PizzaView.vue";
import AppDrop from "../common/components/AppDrop.vue";

const doughItems = doughJSON.map(normalizeDough);
const sizeItems = sizesJSON.map(normalizeSize);
const sauces = saucesJSON.map(normalizeSauce);
const ingredients = ingredientsJSON.map(normalizeIngredient);

/*const getImage = (image) => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};*/

const pizzaData = reactive({
  name: "",
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauces[0].value,
  ingredients: {},
});

const ingredientDrop = ({ ingredientName }) => {
  pizzaData.ingredients[ingredientName] =
    (pizzaData.ingredients[ingredientName] ?? 0) + 1;
};

const price = computed(() => {
  const { dough, size, sauce, ingredients: selectedIngredients } = pizzaData;

  const multiplier =
    sizeItems.find(({ value }) => value === size)?.multiplier ?? 1;
  const doughPrice =
    doughItems.find(({ value }) => value === dough)?.price ?? 0;
  const saucePrice = sauces.find(({ value }) => value === sauce)?.price ?? 0;
  let ingredientsPrice = 0;

  for (const ingredientName in selectedIngredients) {
    const ingredientCount = selectedIngredients[ingredientName];
    const ingredientPrice =
      ingredients.find(({ value }) => value === ingredientName)?.price ?? 0;

    ingredientsPrice += ingredientPrice * ingredientCount;
  }

  return multiplier * (doughPrice + saucePrice + ingredientsPrice);
});

const submitDisabled = computed(
  () => pizzaData.name.length === 0 || price.value === 0,
);
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector v-model="pizzaData.dough" :items="doughItems" />

        <size-selector v-model="pizzaData.size" :items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="pizzaData.sauce" :items="sauces" />

              <ingredients-selector
                v-model="pizzaData.ingredients"
                :items="ingredients"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaData.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <app-drop @drop="ingredientDrop">
            <pizza-view :pizza="pizzaData" />
          </app-drop>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="submitDisabled">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
