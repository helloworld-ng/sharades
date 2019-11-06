<template>
  <section class="turn">
    <header>
      <div class="turn__timer">{{ activeTurn.timeLeft }}</div>
    </header>
    <main>
      <div class="turn__word h2">
        <span v-if="activeTurn.started">
          {{ actingWord }}
        </span>
        <span v-else>
          {{ turnDescription  }}
        </span>
      </div>
    </main>
    <footer>
      <span v-if="activeTurn.started">
        {{ activeTurn.correctGuesses.length }}
      </span>
      <span v-else>
        <ul class="turn__instructions">
          <li>Tap twice if you guess right</li>
          <li>Swipe to change the word</li>
          <li>Tap twice to start</li>
        </ul>
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
      return `Team ${this.activeTurn.team} / Turn ${this.activeTurn.count}`;
    },
  },
  data() {
    return {
      startTimer: false,
    };
  },
  methods: {
    ...mapActions([
      'startCurrentTurn',
      'saveCorrectGuess',
      'changeActingWord',
    ]),
    onDoubleTap() {
      if (this.activeTurn.started) {
        this.saveCorrectGuess();
      } else {
        this.startCurrentTurn();
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
@import '../../scss/layout/frame';

.turn {
  padding: 30px;
  &__label {
    color: $green;
  }
  &__word {
    color: $yellow;
  }
  &--active {
    &__label {
      color: $neutral;
    }
    &__word {
      color: $green;
    }
  }
  &__start {
    color: $green;
  }
}
</style>
