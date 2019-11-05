<template>
  <section class="home">
    <section class="home__background">
      <background :sequence="animationSequence"
       :pauseAnimation="homeScreen !== 'welcome'" @change="onAnimationChange" />
    </section>
    <section class="home__header">
      <wordmark :text="screenName" :pauseAnimation="homeScreen !== 'welcome'" @click="goToScreen('welcome')" />
    </section>
    <section class="home__body">
      <transition :name="transitionDirection" mode="out-in">
        <div v-if="homeScreen === 'welcome'" key="welcome">
          <welcome @clickedPlay="goToScreen('categoryChoice')" />
        </div>
        <div v-else-if="homeScreen === 'categoryChoice'" key="category">
          <category-choice @setCategory="goToScreen('gameConfig')" />
        </div>
        <div v-else-if="homeScreen === 'gameConfig'" key="config">
          <game-config @clickedStart="startGame()" />
        </div>
      </transition>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Background from './Background.vue';
import Wordmark from '../shared/Wordmark.vue';
import Welcome from './Welcome.vue';
import CategoryChoice from './CategoryChoice.vue';
import GameConfig from './GameConfig.vue';

export default {
  name: 'Home',
  components: {
    Background,
    Wordmark,
    Welcome,
    CategoryChoice,
    GameConfig,
  },
  computed: {
    ...mapGetters([
      'animationSequence',
      'homeScreens',
      'homeScreen',
      'backgroundColour',
      'gameConfig',
      'transitionDirection',
    ]),
    screenName() {
      const currentScreen = this.homeScreens.find(screen => screen.id === this.homeScreen);
      return this.homeScreen === 'gameConfig' ? this.gameConfig.category : currentScreen.name;
    },
  },
  methods: {
    ...mapActions([
      'configureHomeScreen',
      'goToScreen',
      'startGame',
    ]),
    onAnimationChange(activeSequence) {
      const { backgroundColour } = activeSequence;
      this.configureHomeScreen({ backgroundColour });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';

.home {
  padding: 30px 30px 30px;
  background: $green;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &__header, &__body {
    position: relative;
    z-index: 2;
  }
  &__body {
    flex: 1;
    > div {
      height: 100%;
    }
  }
}

.moveleft-enter-active,
.moveleft-leave-active,
.moveright-enter-active,
.moveright-leave-active {
  transition: transform .3s;
}
.moveleft-enter {
  transform: translateX(100%);
}
.moveleft-leave-to {
  transform: translateX(-100%);
}
.moveright-enter {
  transform: translateX(-100%);
}
.moveright-leave-to {
  transform: translateX(100%);
}
</style>
