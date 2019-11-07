<template>
  <div class="picker">
    <div class="picker__button">
      <button @click="next()">
        <img src="./icons/chevron-left.svg">
      </button>
    </div>
    <div class="picker__value">
      <span class="picker-value">{{ value }}</span>
      <span class="picker-label" v-if="label">
        {{ label }}
      </span>
    </div>
    <div class="picker__button">
      <button @click="previous()">
        <img src="./icons/chevron-right.svg">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordPicker',
  props: {
    options: Array,
    value: [String, Number],
    label: {
      type: String,
      required: false,
    },
    valueProp: {
      type: String,
      default: 'id',
    },
    labelProp: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      selection: null,
    };
  },
  computed: {
    lastIndex() {
      return this.options.length - 1;
    },
    selectionIndex() {
      return this.options.indexOf(this.selection);
    },
  },
  methods: {
    get(option, property) {
      return typeof option === 'object' ? option[this[property]] : option;
    },
    next() {
      const nextOption = this.selectionIndex === this.lastIndex ? 0 : this.selectionIndex + 1;
      this.select(nextOption);
    },
    previous() {
      const nextOption = this.selectionIndex === 0 ? this.lastIndex : this.selectionIndex - 1;
      this.select(nextOption);
    },
    select(index) {
      this.selection = this.options[index];
      this.$emit('input', this.get(this.selection, 'valueProp'));
    },
  },
  created() {
    this.select(0);
  },
};
</script>


<style scoped lang="scss">
@import './scss/picker.scss';
</style>
