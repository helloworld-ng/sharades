<template>
  <a :class="className">
    {{ sign }}
  </a>
</template>

<script>
export default {
  name: 'GameButton',
  props: {
    sign: String,
    colour: String,
  },
  computed: {
    className() {
      return `button ${this.colour}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.button {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: $yellow;
  color: $green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Ultra Compressed';
  font-weight: normal;
  font-size: 48px;
  &.green {
    color: $green;
  }
  &.blue {
    color: $blue;
  }
  &.red {
    color: $red;
  }
}
</style>
