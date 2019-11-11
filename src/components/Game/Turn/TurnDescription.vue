<template>
  <div class="turn-description">
    <h5>Team {{ activeTurn.team }} &middot; Turn {{ activeTurn.count }}</h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnDescription',
  computed: {
    ...mapGetters([
      'activeTurn',
    ]),
  },
};
</script>
