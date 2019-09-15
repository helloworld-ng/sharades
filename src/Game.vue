<template>
  <div class="game">
    <home v-if="is('IDLE')" />
    <category v-else-if="is('CHOOSE_CATEGORY')" />
    <options v-else-if="is('CHOOSE_OPTIONS')" />
    <turn v-else-if="is('IN_PROGRESS')" />
    <stats v-else-if="is(['PAUSED', 'ENDED'])" />
    <div>
      <button @click="startGame()" v-if="is('IDLE')">Start Game</button>
      <button @click="nextTurn()" v-if="is('IN_PROGRESS')">Next Turn</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Home from './components/Home.vue';
import Category from './components/Category.vue';
import Options from './components/Options.vue';
import Turn from './components/Turn.vue';
import Stats from './components/Stats.vue';

export default {
  name: 'game',
  components: {
    Home,
    Category,
    Options,
    Turn,
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
      'startGame',
      'nextTurn',
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
</style>
