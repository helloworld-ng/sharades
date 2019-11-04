<template>
  <div class="background">
    <div :class="className"></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    sequence: Array,
    pauseAnimation: Boolean,
  },
  data() {
    return {
      intervalFunction: null,
      intervalDuration: 2500,
      activeSequence: 0,
    };
  },
  computed: {
    className() {
      const { lineColour, lineDirection, backgroundColour } = this.sequence[this.activeSequence];
      return `${lineColour}-lines ${lineDirection} ${backgroundColour}-bg`;
    },
  },
  created() {
    const stepCount = this.sequence.length;
    this.intervalFunction = setInterval(() => {
      if (this.pauseAnimation) return;
      const nextSequence = this.activeSequence + 1;
      this.activeSequence = (nextSequence < stepCount) ? nextSequence : 0;
      this.$emit('change', this.sequence[this.activeSequence]);
    }, this.intervalDuration);
  },
  destroyed() {
    window.clearInterval(this.intervalFunction);
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';

.background {
  height: 100%;
}

.background > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &::before, &::after {
    content: '';
    position: absolute;
  }
  &.to-left, &.to-right {
    &::before, &::after {
      animation-duration: .5s;
    }
  }
  &.to-top {
    &::before, &::after {
      animation-duration: .6s;
    }
  }
  &.to-left, &.to-right {
    &::before, &::after {
      width: 100%;
      height: 50%;
    }
    &::before {
      top: 0;
    }
    &::after {
      top: 50%;
    }
  }
  &.to-top, &.to-bottom {
    &::before, &::after {
      width: 50%;
      height: 100%
    }
    &::before {
      left: 0;
    }
    &::after {
      left: 50%;
    }
  }
  &.to-right {
    &::before, &::after {
      animation-name: to-right;
      transform: translateX(100%);
    }
    &::before {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &::after {
      animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  &.to-top {
    &::before, &::after {
      animation-name: to-top;
      transform: translateY(-100%);
    }
    &::before {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    &::after {
      animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  &.blue-lines {
    &::before, &::after {
      background-color: $blue;
    }
  }
  &.green-lines {
    &::before, &::after {
      background-color: $green;
    }
  }
  &.red-lines {
    &::before, &::after {
      background-color: $red;
    }
  }
  &.blue-bg {
    background-color: $blue;
  }
  &.green-bg {
    background-color: $green;
  }
  &.red-bg {
    background-color: $red;
  }
}

@keyframes to-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@keyframes to-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

@keyframes to-top {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}
</style>
