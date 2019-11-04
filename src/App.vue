<template>
  <div class="app">
    <main v-if="appState === 'IDLE'">
      <home />
    </main>
    <main v-if="appState === 'GAME_IN_PROGRESS'">
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
