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
      let className = 'button';
      const additionalStyles = [this.textColour, this.size];
      additionalStyles.forEach((style) => {
        if (style) {
          className += ` button__${style}`;
        }
      });
      return className;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';
@import '../../scss/buttonreset';

.button {
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 50%;
  background: $yellow;
  color: $green;
  font-family: 'Helvetica Ultra Compressed', sans-serif;
  font-weight: normal;
  font-size: 48px;
  text-align: center;
  &__green {
    color: $green;
  }
  &__blue {
    color: $blue;
  }
  &__red {
    color: $red;
  }
  &__small {
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 36px;
  }
}
</style>
