<template>
  <div class="turn-timer" :class="{ active: activeTurn.started }">
    <h5>{{ activeTurn.timeLeft }}</h5>
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
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss/colours';

.turn-timer {
  color: $offwhite;
  &.active {
    color: $yellow;
  }
}
</style>
