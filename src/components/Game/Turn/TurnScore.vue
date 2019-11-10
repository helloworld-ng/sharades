<template>
  <div class="turn-score" :class="{ active: active }">
    {{ this.score }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnCount',
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
    score() {
      return this.activeTurn.correctGuesses.length;
    },
    active() {
      return this.activeTurn.started;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/colours';

.turn-score {
  color: $mutedwhite;
  &.active {
    color: white;
  }
}
</style>
