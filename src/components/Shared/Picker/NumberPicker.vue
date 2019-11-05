<template>
  <div class="picker">
    <div class="picker__button">
      <button @click="subtract()" :disabled="value <= minValue">
        <img src="./icons/minus.svg">
      </button>
    </div>
    <div class="picker__value">
      <span class="picker-value">{{ value }}</span>
      <span class="picker-label" v-if="label">
        {{ label }}
      </span>
    </div>
    <div class="picker__button">
      <button @click="add()">
        <img src="./icons/plus.svg">
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NumberPicker',
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    minValue: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    add() {
      const newValue = this.value + 1;
      this.$emit('input', newValue);
    },
    subtract() {
      const newValue = this.value - 1;
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import './scss/picker.scss';
</style>
