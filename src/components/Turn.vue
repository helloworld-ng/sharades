<template>
  <div class="turn">
    Turn {{ currentTurn.id }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Turn',
  computed: {
    ...mapGetters([
      'currentTurn',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
