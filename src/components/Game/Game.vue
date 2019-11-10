<template>
  <div class="game">
    <component
      :is="view"
      @startTurn="setView('Turn')"
      @turnEnded="setView('TurnStats')"
      @ready="setView('Ready')"
      @endGame="setView('GameStats')"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Ready from './Ready.vue';
import Turn from './Turn/Turn.vue';
import TurnStats from './Turn/Stats.vue';
import GameStats from './Stats.vue';

export default {
  name: 'Game',
  components: {
    Ready,
    Turn,
    TurnStats,
    GameStats,
  },
  data() {
    return {
      view: 'Ready',
    };
  },
  methods: {
    ...mapActions([
      'startActiveTurn',
    ]),
    setView(view) {
      this.view = view;
    },
  },
};
</script>


<style scoped lang="scss">
.game {
  height: 100%;
}
</style>
