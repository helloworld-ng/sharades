<template>
  <div class="app">
    <div class="app__background">
      <background :sequence="animationSequence"
       :animate="viewIs('Welcome')" @change="onAnimationChange" />
    </div>
    <main class="app__content">
      <header class="app__header">
        <wordmark :animate="viewIs('Welcome')" />
      </header>
      <transition :name="transition" mode="out-in">
        <component :is="activeComponent" />
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Background from './components/global/Background.vue';
import Wordmark from './components/Home/Wordmark.vue';
import Welcome from './components/Home/Welcome.vue';
import Category from './components/Config/Category.vue';
import Preferences from './components/Config/Preferences.vue';
import Game from './components/Game/Game.vue';

export default {
  name: 'app',
  components: {
    Background,
    Wordmark,
    Welcome,
    Category,
    Preferences,
    Game,
  },
  computed: {
    ...mapGetters([
      'animationSequence',
      'activeComponent',
      'transition',
      'gameCategory',
    ]),
    gameInProgress() {
      return this.activeComponent === 'Game';
    },
  },
  methods: {
    ...mapActions([
      'saveBackgroundColour',
    ]),
    viewIs(name) {
      return this.activeComponent === name;
    },
    onAnimationChange(activeSequence) {
      const { backgroundColour } = activeSequence;
      this.saveBackgroundColour(backgroundColour);
    },
  },
};
</script>

<style lang="scss">
@import '/scss/reset';
@import '/scss/type';
@import '/scss/layout/app';
@import '/scss/animation';
</style>
