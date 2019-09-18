<template>
  <div class="cover">
    <div :class="className"></div>
  </div>
</template>

<script>
export default {
  name: 'Cover',
  data() {
    return {
      currentIndex: 0,
      sequence: [{
        lineColor: 'green',
        lineDirection: 'to-right',
        background: 'blue',
      }, {
        lineColor: 'blue',
        lineDirection: 'to-top',
        background: 'red',
      }, {
        lineColor: 'red',
        lineDirection: 'to-right',
        background: 'blue',
      }, {
        lineColor: 'blue',
        lineDirection: 'to-top',
        background: 'green',
      }],
      player: null,
    };
  },
  created() {
    this.$emit('newBackground', this.currentScreen.background);
    const screenCount = this.sequence.length;
    this.player = setInterval(() => {
      const newIndex = this.currentIndex + 1;
      this.currentIndex = (newIndex >= screenCount) ? 0 : newIndex;
      this.$emit('newBackground', this.currentScreen.background);
    }, 2000);
  },
  destroyed() {
    window.clearInterval(this.player);
  },
  computed: {
    currentScreen() {
      return this.sequence[this.currentIndex];
    },
    className() {
      return `${this.currentScreen.lineColor}-lines ${this.currentScreen.lineDirection} ${this.currentScreen.background}-bg`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.cover {
  height: 100%;
}

.cover > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &::before, &::after {
    content: '';
    position: absolute;
  }
  &.to-left, &.to-right, &.to-top {
    &::before, &::after {
      animation-duration: 1s;
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
  &.to-left {
    &::before, &::after {
      animation-name: to-left;
      transform: translateX(-100%);
    }
    &::before {
      animation-timing-function: ease-in;
    }
    &::after {
      animation-timing-function: ease-out;
    }
  }
  &.to-right {
    &::before, &::after {
      animation-name: to-right;
      transform: translateX(100%);
    }
    &::before {
      animation-timing-function: ease-in;
    }
    &::after {
      animation-timing-function: ease-out;
    }
  }
  &.to-top {
    &::before, &::after {
      animation-name: to-top;
      transform: translateY(-100%);
    }
    &::before {
      animation-timing-function: ease-in;
    }
    &::after {
      animation-timing-function: ease-out;
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
