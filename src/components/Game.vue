<template>
  <div class="game">
    Turn {{ currentTurn.id }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Game',
  computed: {
    ...mapGetters([
      'currentTurn',
    ]),
  },
};
</script>


<style scoped lang="scss">
</style>
