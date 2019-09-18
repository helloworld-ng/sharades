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


<style scoped lang="scss">
</style>
