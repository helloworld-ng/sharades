<template>
  <div class="turn-word">
    <span class="turn-word__display">
      {{ actingWord }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnWord',
  props: {
    strikeLeft: Boolean,
    strikeRight: Boolean,
  },
  computed: {
    ...mapGetters([
      'activeTurn',
      'actingWord',
    ]),
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss/colours';
@import '../../../scss/textstyles';

.turn-word {
  position: relative;
  text-transform: uppercase;
  text-align: center;
  &__display {
    @include header(2);
    color: $yellow;
  }
}
</style>
