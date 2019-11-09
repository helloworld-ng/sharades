<template>
  <div class="turn-count" :class="{ active: active }">
    {{ text }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnCount',
  props: {
    placeholder: [String, Number],
  },
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
    count() {
      return this.activeTurn.correctGuesses.length;
    },
    active() {
      return this.activeTurn.started;
    },
    text() {
      return this.active ? this.count : this.placeholder;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/colours';

.turn-count {
  color: $mutedwhite;
  &.active {
    color: white;
  }
}
</style>
