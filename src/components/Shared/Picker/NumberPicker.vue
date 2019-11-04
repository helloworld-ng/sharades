<template>
  <div class="picker" v-if="unit === 'numbers'">
    <button class="picker__icon" @click="subtract()" :disabled="value <= minValue">
      <img src="./icons/minus.svg">
    </button>
    <span class="picker__value">{{ value }}</span>
    <button class="picker__icon" @click="add()">
      <img src="./icons/plus.svg">
    </button>
  </div>
</template>

<script>

export default {
  name: 'NumberPicker',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    add() {
      const newValue = this.value + 1;
      this.$emit('value', newValue);
    },
    subtract() {
      const newValue = this.value - 1;
      this.$emit('value', newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import './scss/picker.scss';
</style>
