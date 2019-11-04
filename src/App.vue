<template>
  <div class="app">
    <main v-if="appState === 'idle'">
      <home />
    </main>
    <main v-else-if="appState === 'gameInProgress'">
      <game />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Home from './components/Home/Home.vue';
import Game from './components/Game/Game.vue';

export default {
  name: 'app',
  components: {
    Home,
    Game,
  },
  computed: mapGetters([
    'appState',
    'states',
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
