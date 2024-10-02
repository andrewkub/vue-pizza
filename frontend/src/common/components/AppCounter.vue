<script setup>
import { getCurrentInstance } from "vue";

const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
  accent: {
    type: Boolean,
    default: false,
  },
  maxValue: {
    type: Number,
    default: 100,
  },
  minValue: {
    type: Number,
    default: 0,
  },
});

const instance = getCurrentInstance();
const emit = defineEmits(["update:count"]);

const updateValue = (value) => {
  if (value < props.minValue || value > props.maxValue) {
    instance.proxy?.$forceUpdate();
    return;
  }

  emit("update:count", value);
};
</script>

<template>
  <div class="counter">
    <button
      class="counter__button counter__button--minus"
      :disabled="count <= minValue"
      type="button"
      @click="updateValue(count - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      class="counter__input"
      name="counter"
      type="number"
      :value="count"
      @input="updateValue($event.target.value)"
    />

    <button
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': accent }"
      type="button"
      :disabled="count >= maxValue"
      @click="updateValue(count + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
