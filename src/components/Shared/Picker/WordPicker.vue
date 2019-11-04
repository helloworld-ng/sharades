<template>
  <div class="picker" v-if="unit === 'words'">
    <button class="picker__button" @click="next()">
      <img src="./icons/chevron-left.svg">
    </button>
    <span class="picker__value">{{ value }}</span>
    <button class="picker__button" @click="previous()">
      <img src="./icons/chevron-right.svg">
    </button>
  </div>
</template>

<script>
export default {
  name: 'NumberPicker',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      option: 1,
    };
  },
  computed: {
    value() {
      const index = this.option - 1;
      return this.options[index];
    },
  },
  methods: {
    next() {
      const lastOption = this.options.length;
      this.option = this.option === lastOption ? 0 : this.option + 1;
      this.$emit('value', this.value());
    },
    previous() {
      const lastOption = this.options.length;
      this.option = this.option === 1 ? lastOption : this.option - 1;
      this.$emit('value', this.value());
    },
  },
};
</script>


<style scoped lang="scss">
@import './scss/picker.scss';
</style>
