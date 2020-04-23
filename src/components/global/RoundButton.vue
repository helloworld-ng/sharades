<template>
  <a :class="className" @click="onClick">
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
    outline: Boolean,
    muted: Boolean,
    animate: Boolean,
  },
  data() {
    return {
      clicked: false,
    };
  },
  computed: {
    ...mapGetters([
      'backgroundColour',
    ]),
    className() {
      let className = 'button';
      const colour = this.textColour || this.backgroundColour;
      const brightness = this.muted && 'muted';
      const outline = this.outline && 'outline';
      const additionalStyles = [colour, this.size, brightness, outline];
      additionalStyles.forEach((style) => {
        if (style) {
          className += ` button__${style}`;
        }
      });
      if (this.clicked && this.animate) {
        className += ' animate';
      }
      return className;
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 300);
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
  line-height: 145px;
  border-radius: 50%;
  background: $yellow;
  color: $blue;
  font-family: 'Helvetica Ultra Compressed', sans-serif;
  font-weight: normal;
  font-size: 48px;
  text-align: center;
  text-transform: uppercase;
  transition: transform 0.3s ease;
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
    line-height: 95px;
    font-size: 36px;
  }
  &__muted {
    background: $mutedwhite;
  }
  &__outline {
    background: none;
    color: $yellow;
    border: solid 1px $yellow;
  }
  &.animate {
    animation: jump 0.2s;
  }
}

@keyframes jump {
  to { transform: scale(1.1) rotate(10deg); }
}
</style>
