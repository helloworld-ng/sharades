<template>
  <section id="turn">
    <turn-stage
      @doubleTap="onDoubleTap"
      @swipe="onSwipe"
      :pauseListeners="pauseListeners"
    >
      <header>
        <turn-timer />
      </header>
      <article>
        <turn-word
          :strikeLeft="lastSwipeDirection.left"
          :strikeRight="lastSwipeDirection.right"
          @animating="pauseListeners = true"
          @notAnimating="pauseListeners = false"
        />
      </article>
      <footer>
        <turn-score />
      </footer>
    </turn-stage>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TurnStage from './TurnStage.vue';
import TurnTimer from './TurnTimer.vue';
import TurnWord from './TurnWord.vue';
import TurnScore from './TurnScore.vue';

export default {
  name: 'Turn',
  components: {
    TurnStage,
    TurnTimer,
    TurnWord,
    TurnScore,
  },
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
  },
  data() {
    return {
      swipeListener: null,
      lastSwipeDirection: {},
      pauseListeners: false,
    };
  },
  methods: {
    ...mapActions([
      'playTurn',
      'correctlyGuessed',
      'skipWord',
    ]),
    onDoubleTap() {
      if (this.activeTurn.started) {
        this.correctlyGuessed();
      } else {
        this.start();
      }
    },
    onSwipe(direction) {
      this.lastSwipeDirection = direction;
      this.skipWord();
    },
  },
  async created() {
    await this.playTurn();
    this.$emit('turnEnded');
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
}
</style>
