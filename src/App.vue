<template>
  <div class="app">
    <main v-if="appState === 'idle'">
      <home />
    </main>
    <main v-else>
      <turn v-if="appState === 'turnInProgress'" />
      <stats v-if="appState === 'turnCompleted'" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Home from './components/Home/Home.vue';
import Turn from './components/Game/Turn.vue';
import Stats from './components/Game/Stats.vue';

export default {
  name: 'app',
  components: {
    Home,
    Turn,
    Stats,
  },
  computed: mapGetters([
    'appState',
  ]),
};
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  > main {
    width: 100%;
    height: 100%;
  }
}
</style>
