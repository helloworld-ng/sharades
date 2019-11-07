<template>
  <section id="turn" class="frame" ref="stage">
    <header>
      <div class="turn__timer">
        {{ activeTurn.timeLeft }}s
      </div>
    </header>
    <article>
      <div class="turn__word">
        {{ centerContent }}
      </div>
    </article>
    <footer>
      <span class="turn__footer">
        {{ footerContent }}
      </span>
    </footer>
  </section>
</template>

<script>
import SwipeListener from 'swipe-listener';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Turn',
  computed: {
    ...mapGetters([
      'activeTurn',
      'actingWord',
    ]),
    turnDescription() {
      return `Team ${this.activeTurn.team} ☞ Turn ${this.activeTurn.count}`;
    },
    centerContent() {
      return this.activeTurn.started ? this.actingWord : this.turnDescription;
    },
    correctGuesses() {
      return this.activeTurn.correctGuesses.length;
    },
    footerContent() {
      return this.activeTurn.started ? this.correctGuesses : 'Double tap to start';
    },
  },
  data() {
    return {
      swipeListener: null,
    };
  },
  methods: {
    ...mapActions([
      'startActiveTurn',
      'saveCorrectGuess',
      'changeActingWord',
    ]),
    listenForDoubleTap() {
      let firstTapWasRecent = false;
      let firstTapTimeout;
      this.$refs.stage.addEventListener('click', () => {
        if (firstTapWasRecent) {
          window.clearTimeout(firstTapTimeout);
          firstTapWasRecent = false;
          this.onDoubleTap();
        } else {
          firstTapWasRecent = true;
          firstTapTimeout = setTimeout(() => {
            firstTapWasRecent = false;
          }, 300);
        }
      });
    },
    onDoubleTap() {
      if (this.activeTurn.started) {
        this.saveCorrectGuess();
      } else {
        this.startActiveTurn();
        this.listenForSwipe();
      }
    },
    listenForSwipe() {
      this.swipeListener = SwipeListener(this.$refs.stage);
      this.$refs.stage.addEventListener('swipe', ({ detail: { directions } }) => {
        if (directions.left) {
          this.changeActingWord();
        }
      });
    },
  },
  mounted() {
    this.listenForDoubleTap();
  },
  destroyed() {
    if (this.swipeListener) {
      this.swipeListener.off();
    }
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';
@import '../../scss/textstyles';
@import '../../scss/layout/frame';

.turn {
  &__label {
    color: $green;
  }
  &__word {
    color: $yellow;
    text-transform: uppercase;
    @include header(2);
  }
  &__footer {
    color: rgba(255,255,255,.7);
  }
}
</style>
