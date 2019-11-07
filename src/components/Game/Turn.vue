<template>
  <section id="turn" class="frame" @click="onDoubleTap">
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
      return this.activeTurn.started ? this.correctGuesses : 'Tap twice to start';
    },
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
      } else {
        this.startActiveTurn();
      }
    },
    onSwipe() {
      this.changeActingWord();
    },
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
