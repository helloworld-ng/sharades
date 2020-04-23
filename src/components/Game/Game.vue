<template>
  <div class="game">
    <transition :name="transitionName" mode="out-in">
      <component
        :is="view"
        @startTurn="setView('Turn')"
        @turnEnded="setView('TurnStats')"
        @ready="setView('Ready')"
        @endGame="setView('GameStats')"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Ready from './Ready.vue';
import Turn from './Turn/Turn.vue';
import TurnStats from './Turn/TurnStats.vue';
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
  computed: {
    transitionName() {
      const transitions = {
        Ready: 'moveleft',
        Turn: '',
        TurnStats: 'fade',
        GameStats: 'moveleft',
      };
      return transitions[this.view];
    },
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
