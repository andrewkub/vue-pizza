<script setup>
import { getCurrentInstance, computed } from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants.js";
import AppCounter from "../../common/components/AppCounter.vue";

const instance = getCurrentInstance();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedIngredients = computed({
  get: () => props.modelValue,
  set: (ingredients) => {
    const update = {};

    for (const [name, value] of Object.entries(ingredients)) {
      value && (update[name] = value);
    }

    emit("update:modelValue", update);
  },
});

const getCount = (ingredientName) =>
  selectedIngredients.value[ingredientName] || 0;
const setCount = (ingredientName, value) => {
  selectedIngredients.value = {
    ...selectedIngredients.value,
    [ingredientName]: Math.min(MAX_INGREDIENT_COUNT, Math.max(0, value)),
  };
};
</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in props.items"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          :draggable="getCount(ingredient.value) < MAX_INGREDIENT_COUNT"
          :data-transfer="{ ingredientName: ingredient.value }"
        >
          <span :class="`filling filling--${ingredient.value}`">
            <!--            <img
              :alt="ingredient.name"
              :src="getImage(ingredient.image)"
            />-->

            {{ ingredient.name }}
          </span>
        </app-drag>

        <app-counter
          class="counter-orange ingredients__counter"
          :count="getCount(ingredient.value)"
          :max-value="MAX_INGREDIENT_COUNT"
          @update:count="setCount(ingredient.value, $event)"
        ></app-counter>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}
</style>
