<template>
  <section class="home">
    <div class="home__background">
      <background :sequence="animationSequence" @change="onAnimationChange" />
    </div>
    <header class="home__header">
      <wordmark :text="screenName" :animate="isWelcomeScreen" />
    </header>
    <main class="home__body">
      <transition :name="transitionDirection" mode="out-in">
        <div v-if="visibleScreen === 'WELCOME'" :key="welcome">
          <welcome :buttonColor="buttonColor" @clickedPlay="goToScreen('CATEGORY')" />
        </div>
        <div v-else-if="visibleScreen === 'CATEGORY'" :key="category">
          <category-choice @next="goToScreen('CONFIG')" />
        </div>
        <div v-else-if="visibleScreen === 'CONFIG'" :key="config">
          <game-config @clickedStart="startGame()" />
        </div>
      </transition>
    </main>
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
  data() {
    return {
      buttonColor: null,
    };
  },
  computed: {
    ...mapGetters([
      'visibleScreen',
      'backgroundColor',
      'animationSequence',
      'gameConfig',
    ]),
    screenName() {
      const visibleScreen = this.visibleScreen.id;
      return visibleScreen === 'CONFIG' ? this.gameConfig.category : this.visibleScreen.name;
    },
    isWelcomeScreen() {
      return this.visibleScreen.id === 'WELCOME';
    },
  },
  methods: {
    ...mapActions([
      'changeBackgroundColor',
      'goToScreen',
      'startGame',
    ]),
    onAnimationChange(activeSequence) {
      const { backgroundColor } = activeSequence;
      this.changeBackgroundColor(backgroundColor);
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
  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 2;
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
