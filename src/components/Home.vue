<template>
  <section class="home">
    <div class="background">
      <cover v-bind="currentAnimation" />
    </div>
    <section class="frame">
      <header>
        <wordmark :sign="wordmarkText" :paused="animationIsPaused" />
      </header>
      <section class="body">
        <transition :name="screenTransition" mode="out-in">
          <div key="nav" id="nav" class="centered" v-if="activeScreen === screens.WELCOME">
            <play-button
              :colour="currentAnimation.backgroundColour"
              @click="slideTo('CATEGORY')"
            />
          </div>
          <div key="category" id="category" v-if="activeScreen === screens.CATEGORY">
            <list :items="categories" @choose="setCategory" />
          </div>
          <div key="config" id="config" v-if="activeScreen === screens.CONFIG">
            <config />
          </div>
          <div key="about" id="about" v-if="activeScreen === screens.ABOUT"></div>
          <div key="tutorial" id="tutorial" v-if="activeScreen === screens.TUTORIAL"></div>
        </transition>
      </section>
      <footer class="links">
        <div v-if="activeScreen === screens.WELCOME">
          <a @click="slideTo('ABOUT')">About</a>
          <a @click="slideTo('TUTORIAL')">Tutorial</a>
        </div>
        <div v-if="activeScreen === screens.CATEGORY">
          <a @click="slideTo('WELCOME')">Back</a>
          <a @click="chooseRandomCategory()">Random</a>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Wordmark from './Shared/Wordmark.vue';
import PlayButton from './Home/PlayButton.vue';
import Cover from './Home/Cover.vue';
import List from './Home/List.vue';
import Config from './Home/Config.vue';

export default {
  name: 'Home',
  components: {
    Wordmark,
    PlayButton,
    Cover,
    List,
    Config,
  },
  data() {
    const screens = {
      WELCOME: 0,
      CATEGORY: 1,
      CONFIG: 2,
      ABOUT: 3,
      TUTORIAL: 4,
    };

    return {
      screens,
      activeScreen: screens.WELCOME,
      screenTransition: null,
      backgroundAnimation: null,
      currentAnimationIndex: 0,
      animationDuration: 2500,
    };
  },
  computed: {
    ...mapGetters([
      'config',
      'allCategories',
      'animationSequence',
    ]),
    categories() {
      return Object.values(this.allCategories);
    },
    currentAnimation() {
      return this.animationSequence[this.currentAnimationIndex];
    },
    animationIsPaused() {
      return this.activeScreen !== this.screens.WELCOME;
    },
    wordmarkText() {
      switch (this.activeScreen) {
        case this.screens.CATEGORY:
          return 'Choose Category';
        case this.screens.CONFIG:
          return this.config.category;
        default:
          return null;
      }
    },
  },
  methods: {
    slideTo(screenName) {
      const destinationScreen = this.screens[screenName];
      const isPreviousScreen = this.activeScreen > destinationScreen;
      this.screenTransition = isPreviousScreen ? 'moveright' : 'moveleft';
      this.activeScreen = destinationScreen;
    },
    setCategory(category) {
      this.$store.dispatch('setConfig', { category });
      this.slideTo('CONFIG');
    },
    chooseRandomCategory() {
      const randomIndex = Math.ceil(Math.random(0, 1) * this.categories.length) - 1;
      const category = this.categories[randomIndex];
      this.setCategory(category);
    },
    setConfig() {},
  },
  created() {
    const screenCount = this.animationSequence.length;
    this.backgroundAnimation = setInterval(() => {
      if (this.animationIsPaused) return;
      const nextSlide = this.currentAnimationIndex + 1;
      this.currentAnimationIndex = (nextSlide < screenCount) ? nextSlide : 0;
    }, this.animationDuration);
  },
  destroyed() {
    window.clearInterval(this.backgroundAnimation);
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.home {
  padding: 30px 30px 30px;
  background: $green;
  height: 100%;
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .frame, .body {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .body {
    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  .centered {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.links {
  a {
    color: $yellow;
    &:last-child {
      float: right;
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
