<template>
  <section id="turn">
    <turn-stage
      :listeners="listeners"
      @doubleTap="onDoubleTap"
      @swipe="onSwipe"
      :pauseListeners="pauseListeners"
    >
      <header>
        <turn-timer />
      </header>
      <article>
        <turn-word
          :placeholder="turnDescription"
          :strikeLeft="lastSwipeDirection.left"
          :strikeRight="lastSwipeDirection.right"
          @animating="pauseListeners = true"
          @notAnimating="pauseListeners = false"
        />
      </article>
      <footer>
        <turn-count placeholder="Double tap to start" />
      </footer>
    </turn-stage>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TurnStage from './TurnStage.vue';
import TurnTimer from './TurnTimer.vue';
import TurnWord from './TurnWord.vue';
import TurnCount from './TurnCount.vue';

export default {
  name: 'Turn',
  components: {
    TurnStage,
    TurnTimer,
    TurnWord,
    TurnCount,
  },
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
    turnDescription() {
      return `Team ${this.activeTurn.team} ☞ Turn ${this.activeTurn.count}`;
    },
    listeners() {
      return {
        doubleTap: true,
        swipe: this.activeTurn.started,
      };
    },
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
      'startActiveTurn',
      'saveCorrectGuess',
      'changeActingWord',
    ]),
    onDoubleTap() {
      if (this.activeTurn.started) {
        this.saveCorrectGuess();
        return;
      }
      this.startActiveTurn();
    },
    onSwipe(direction) {
      this.lastSwipeDirection = direction;
      this.changeActingWord();
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
}
</style>
