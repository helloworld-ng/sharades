<template>
  <a :class="className" @click="$emit('click')">
    {{ text || 'Play' }}
  </a>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    text: String,
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
@import '../../assets/colours.scss';

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
  font-family: 'Helvetica Ultra Compressed', sans-serif;
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
