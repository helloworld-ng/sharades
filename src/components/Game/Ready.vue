<template>
  <section class="frame">
    <header>
      <turn-description />
    </header>
    <article>
      <transition name="fade" mode="out-in">
        <h2 v-if="countdownStarted">{{ countdown }}</h2>
        <h2 v-else>READY</h2>
      </transition>
    </article>
    <footer>
      <div class="cta" :class="{ hidden: countdownStarted }">
        <round-button text="Start" size="small" @click="start()" />
      </div>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import RoundButton from '../global/RoundButton.vue';
import TurnDescription from './Turn/TurnDescription.vue';

export default {
  name: 'Ready',
  components: {
    RoundButton,
    TurnDescription,
  },
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
@import '../../scss/layout/frame';

.cta {
  &.hidden {
    opacity: 0;
  }
}
</style>
