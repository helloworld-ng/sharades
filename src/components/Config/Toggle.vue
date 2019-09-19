<template>
  <section>
    <div class="toggle" v-if="['teams', 'turns'].includes(toSet)">
      <button class="icon" @click="subtract()" :disabled="value <= minValue">
        <img src="../../assets/images/minus.svg">
      </button>
      <span class="value h2">{{ value }}</span>
      <button class="icon" @click="add()">
        <img src="../../assets/images/plus.svg">
        </button>
    </div>
    <div class="toggle" v-if="toSet === 'mode'">
      <button class="icon" @click="next()">
        <img src="../../assets/images/chevron-left.svg">
      </button>
      <span class="value h2">{{ difficulty }}</span>
      <button class="icon" @click="previous()">
        <img src="../../assets/images/chevron-right.svg">
      </button>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Toggle',
  props: {
    toSet: String,
    value: [String, Number],
  },
  data() {
    return {
      currentIndex: 0,
      minValue: 2,
      options: {
        difficulty: ['Easy', 'Hard'],
      },
    };
  },
  computed: {
    difficulty() {
      return this.options.difficulty[this.currentIndex];
    },
  },
  methods: {
    add() {
      const newValue = this.value + 1;
      this.$emit('input', newValue);
    },
    subtract() {
      const newValue = this.value + 1;
      this.$emit('input', newValue);
    },
    next() {
      const nextIndex = this.currentIndex + 1;
      const firstIndex = 0;
      this.currentIndex = nextIndex >= this.options.length ? firstIndex : nextIndex;
    },
    previous() {
      const previousIndex = this.currentIndex - 1;
      const lastIndex = this.options.length - 1;
      this.currentIndex = previousIndex < 0 ? lastIndex : previousIndex;
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../assets/colours.scss';

.toggle {
  display: flex;
  color: $yellow;
  .value {
    flex: 1;
    text-align: center;
  }
}
</style>
