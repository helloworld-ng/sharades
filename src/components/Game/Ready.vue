<template>
  <section class="frame" @click="start()">
    <header>
      <span class="label">
        Team {{ activeTurn.team }} &middot; Turn {{ activeTurn.count }}
      </span>
    </header>
    <article>
      <transition name="fade" mode="out-in">
        <h2 v-if="countdownStarted">{{ countdown }}</h2>
        <h2 v-else>READY</h2>
      </transition>
    </article>
    <footer>
      <span class="instructions" :class="{ hidden: countdownStarted }">
        Tap screen to start
      </span>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Ready',
  data() {
    return {
      countdown: null,
    };
  },
  computed: {
    ...mapGetters([
      'activeTurn',
      'gameConfig',
      'backgroundColour',
    ]),
    countdownStarted() {
      return this.countdown !== null;
    },
  },
  methods: {
    countToZero() {
      this.countdown = 3;
      return new Promise((resolve) => {
        const countdownTimer = setInterval(() => {
          this.countdown -= 1;
          if (this.countdown === 0) {
            window.clearInterval(countdownTimer);
            resolve();
          }
        }, 1000);
      });
    },
    async start() {
      await this.countToZero();
      this.$emit('startTurn');
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../scss/colours';
@import '../../scss/textstyles';
@import '../../scss/layout/frame';

.label {
  color: $yellow;
  @include header(5);
}

.instructions {
  color: $mutedwhite;
  transition: opacity 300ms;
  &.hidden {
    opacity: 0;
  }
}
</style>
