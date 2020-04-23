<template>
  <section id="turn-stats" class="frame">
    <header>
      <div>
        <turn-result />
      </div>
    </header>
    <article class="scrollable">
      <ul>
        <li v-for="word in activeTurn.usedWords" :key="word">
          <a :class="{ muted: !guessedCorrectly(word) }" @click="toggle(word)">
            {{ word }}
          </a>
        </li>
      </ul>
    </article>
    <footer>
      <span>
        <round-button text="Next" size="small" @click="next()" />
      </span>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoundButton from '../../global/RoundButton.vue';
import TurnResult from './TurnResult.vue';

export default {
  name: 'TurnStats',
  components: {
    RoundButton,
    TurnResult,
  },
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
  },
  methods: {
    ...mapActions([
      'readyNextTurn',
      'undoCorrectGuess',
      'saveCorrectGuess',
    ]),
    guessedCorrectly(word) {
      return this.activeTurn.correctGuesses.includes(word);
    },
    toggle(word) {
      if (this.guessedCorrectly(word)) {
        this.undoCorrectGuess(word);
      } else {
        this.saveCorrectGuess(word);
      }
    },
    next() {
      this.readyNextTurn();
      this.$emit('ready');
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../../scss/colours';
@import '../../../scss/textstyles';
@import '../../../scss/layout/frame';

h2 {
  line-height: 1;
  color: white;
}

article {
  margin: 30px 0;
}

ul {
  li {
    text-align: center;
    a {
      @include header(4);
      color: white;
      &.muted {
        color: $mutedwhite;
      }
    }
  }
}
</style>
