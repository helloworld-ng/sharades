<template>
  <div class="frame" ref="stage">
    <slot></slot>
  </div>
</template>

<script>
import SwipeListener from 'swipe-listener';

export default {
  name: 'TurnStage',
  props: {
    listeners: {
      type: Object,
      default() {
        return {
          doubleTap: true,
          swipe: true,
        };
      },
    },
    pauseListeners: Boolean,
  },
  data() {
    return {
      firstTapWasRecent: false,
      firstTapTimeout: null,
      doubleTapSetup: false,
      swipeSetup: false,
    };
  },
  mounted() {
    this.setupListeners();
  },
  created() {
    this.$watch('listeners', () => this.setupListeners());
  },
  methods: {
    setupListeners() {
      if (this.listeners.doubleTap) {
        this.listenForDoubleTap();
      }
      if (this.listeners.swipe) {
        this.listenForSwipe();
      }
    },
    listenForDoubleTap() {
      if (this.doubleTapSetup) return;
      const { stage } = this.$refs;
      const isTouchDevice = 'ontouchstart' in document.documentElement;
      const tapEvent = isTouchDevice ? 'touchstart' : 'click';
      stage.addEventListener(tapEvent, () => {
        if (this.pauseListeners) return;
        if (this.firstTapWasRecent) {
          window.clearTimeout(this.firstTapTimeout);
          this.firstTapWasRecent = false;
          this.$emit('doubleTap');
        } else {
          this.firstTapWasRecent = true;
          this.firstTapTimeout = setTimeout(() => {
            this.firstTapWasRecent = false;
          }, 300);
        }
      });
      this.doubleTapSetup = true;
    },
    listenForSwipe() {
      if (this.swipeSetup) return;
      this.swipeListener = SwipeListener(this.$refs.stage);
      this.$refs.stage.addEventListener('swipe', ({ detail: { directions: { left, right } } }) => {
        if (this.pauseListeners) return;
        if (left || right) {
          this.$emit('swipe', { left, right });
        }
      });
      this.swipeSetup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/layout/frame';
</style>
