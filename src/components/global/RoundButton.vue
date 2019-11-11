<template>
  <a :class="className" @click="$emit('click')">
    {{ text }}
  </a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RoundButton',
  props: {
    text: [String, Number],
    textColour: String,
    size: String,
    muted: Boolean,
  },
  computed: {
    ...mapGetters([
      'backgroundColour',
    ]),
    className() {
      let className = 'button';
      const colour = this.textColour || this.backgroundColour;
      const brightness = this.muted && 'muted';
      const additionalStyles = [colour, this.size, brightness];
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

.button {
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 50%;
  background: $yellow;
  color: $blue;
  font-family: 'Helvetica Ultra Compressed', sans-serif;
  font-weight: normal;
  font-size: 48px;
  text-align: center;
  text-transform: uppercase;
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
  &__muted {
    background: $mutedwhite;
  }
}
</style>
