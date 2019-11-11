<template>
  <div class="turn-score" :class="{ active: active }">
    <round-button :text="score" size="small" :muted="true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoundButton from '../../global/RoundButton.vue';

export default {
  name: 'TurnCount',
  components: {
    RoundButton,
  },
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
