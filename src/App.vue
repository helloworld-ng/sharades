<template>
  <div class="app">
    <home v-if="is('IDLE')" />
    <game v-else-if="is('IN_PROGRESS')" />
    <stats v-else-if="is(['PAUSED', 'ENDED'])" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Home from './components/Home.vue';
import Game from './components/Game.vue';
import Stats from './components/Stats.vue';

export default {
  name: 'app',
  components: {
    Home,
    Game,
    Stats,
  },
  computed: {
    ...mapGetters([
      'allStates',
      'currentState',
    ]),
  },
  methods: {
    ...mapActions([
      'start',
      'nextTurn',
      'restart',
    ]),
    is(value) {
      if (typeof value === 'object') {
        const states = value.map(state => this.allStates[state]);
        return states.includes(this.currentState);
      }
      return this.allStates[value] === this.currentState;
    },
  },
};
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
