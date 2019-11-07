<template>
  <div class="app">
    <div class="app__background">
      <background :sequence="animationSequence"
       :animate="viewIs('welcome')" @change="onAnimationChange" />
    </div>
    <transition name="fade">
      <main class="app__content" id="game" v-if="gameInProgress">
        <turn v-if="viewIs('gameTurn')" />
        <stats v-if="viewIs('gameStats')" />
      </main>
      <main class="app__content" id="idle" v-else>
        <header>
          <wordmark :label="wordmarkLabel()" :animate="viewIs('welcome')" />
        </header>
        <transition :name="transitionDirection" mode="out-in">
          <welcome v-if="viewIs('welcome')" />
          <category v-if="viewIs('category')" @done="changeView('preferences')" />
          <preferences v-if="viewIs('preferences')" @done="startGame()" />
        </transition>
      </main>
    </transition>
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
      'view',
      'animationSequence',
      'transitionDirection',
      'gameInProgress',
      'gameCategory',
    ]),
  },
  methods: {
    ...mapActions([
      'saveBackgroundColour',
      'changeView',
      'startGame',
    ]),
    viewIs(name) {
      return this.view === name;
    },
    wordmarkLabel() {
      switch (this.view) {
        case 'category':
          return 'Choose a category';
        case 'preferences':
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
