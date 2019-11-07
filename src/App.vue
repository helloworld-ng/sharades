<template>
  <div class="app">
    <div class="app__background">
      <background :sequence="animationSequence"
       :animate="viewIs('welcome')" @change="onAnimationChange" />
    </div>
    <main class="app__content">
      <transition :name="transition" mode="out-in">
        <header v-if="!gameInProgress">
          <wordmark :label="wordmarkLabel()" :animate="viewIs('welcome')" />
        </header>
      </transition>
      <transition :name="transition" mode="out-in">
        <component :is="activeComponent" />
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Background from './components/shared/Background.vue';
import Wordmark from './components/Home/Wordmark.vue';
import Welcome from './components/Home/Welcome.vue';
import Category from './components/Config/Category.vue';
import Preferences from './components/Config/Preferences.vue';
import Turn from './components/Game/Turn.vue';
import Stats from './components/Game/Stats.vue';

export default {
  name: 'app',
  components: {
    Background,
    Wordmark,
    Welcome,
    Category,
    Preferences,
    Turn,
    Stats,
  },
  computed: {
    ...mapGetters([
      'animationSequence',
      'activeComponent',
      'transition',
      'gameInProgress',
      'gameCategory',
    ]),
  },
  methods: {
    ...mapActions([
      'saveBackgroundColour',
    ]),
    viewIs(name) {
      return this.activeComponent === name;
    },
    wordmarkLabel() {
      switch (this.activeComponent) {
        case 'Category':
          return 'Choose a category';
        case 'Preferences':
          return this.gameCategory.label;
        default:
          return 'Nigerian Charades';
      }
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
