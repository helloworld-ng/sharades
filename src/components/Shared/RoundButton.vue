<template>
  <a :class="className" @click="$emit('click')">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'RoundButton',
  props: {
    text: String,
    textColour: String,
    size: String,
  },
  computed: {
    className() {
      return `button ${this.textColour}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';

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
