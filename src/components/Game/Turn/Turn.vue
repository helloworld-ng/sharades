<template>
  <section id="turn">
    <turn-stage
      @swipe="onSkipWord"
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
        <div>
          <round-button text="Skip" size="small" :outline="true" @click="onSkipWord" />
          <round-button text="Got it!" size="small" :animate="true" @click="onCorrectGuess" />
        </div>
      </footer>
    </turn-stage>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TurnStage from './TurnStage.vue';
import TurnTimer from './TurnTimer.vue';
import TurnWord from './TurnWord.vue';
import RoundButton from '../../global/RoundButton.vue';

export default {
  name: 'Turn',
  components: {
    TurnStage,
    TurnTimer,
    TurnWord,
    RoundButton,
  },
  computed: {
    ...mapGetters([
      'activeTurn',
      'actingWord',
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
      'playActiveTurn',
      'saveCorrectGuess',
      'skipWord',
    ]),
    onCorrectGuess() {
      if (this.activeTurn.started) {
        this.saveCorrectGuess(this.actingWord);
      } else {
        this.start();
      }
    },
    onSkipWord(direction) {
      this.lastSwipeDirection = direction;
      this.skipWord(this.actingWord);
    },
  },
  async created() {
    await this.playActiveTurn();
    this.$emit('turnEnded');
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
}
footer {
  div {
    a {
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
}
</style>
