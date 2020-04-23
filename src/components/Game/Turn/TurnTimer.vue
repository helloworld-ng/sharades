<template>
  <div class="turn-timer" :class="{ active: activeTurn.started }">
    <h5>{{ timer }}</h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnTimer',
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
    timer() {
      return Math.max(this.activeTurn.timeLeft, 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss/colours';

.turn-timer {
  color: $offwhite;
  &.active {
    color: white;
  }
}
</style>
