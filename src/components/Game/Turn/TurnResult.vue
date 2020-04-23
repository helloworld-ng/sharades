<template>
  <div class="turn-result">
    <h5>{{ activeTurn.usedWords.length }} {{ words }}
       &middot; {{ activeTurn.correctGuesses.length }} correct</h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnResult',
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
    words() {
      return this.activeTurn.usedWords === 1 ? 'word' : 'words';
    },
  },
};
</script>

<style lang="scss" scoped>
h5 {
  color: white;
}
</style>
