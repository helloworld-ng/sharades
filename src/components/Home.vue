<template>
  <section class="home">
    <div class="background">
      <cover @newBackground="setColour" :paused="pauseAnimation" />
    </div>
    <section class="frame">
      <header>
        <wordmark :sign="wordmarkText" />
      </header>
      <section class="body">
        <transition :name="slideDirection" mode="out-in">
          <div key="nav" id="nav" v-if="activeScreen === screens.WELCOME">
            <div class="centered">
              <round-button sign="play" :colour="bgColour" @click="slideTo('CATEGORY')" />
            </div>
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
import RoundButton from './Shared/RoundButton.vue';
import Cover from './Home/Cover.vue';
import List from './Home/List.vue';
import Config from './Home/Config.vue';

export default {
  name: 'Home',
  components: {
    Wordmark,
    RoundButton,
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
      bgColour: null,
      slideDirection: null,
    };
  },
  computed: {
    ...mapGetters([
      'config',
      'allCategories',
    ]),
    categories() {
      return Object.values(this.allCategories);
    },
    wordmarkText() {
      switch (this.activeScreen) {
        case this.screens.CATEGORY:
          return 'Choose Category';
        case this.screens.CONFIG:
          console.log(this.config);
          return this.config.category;
        default:
          return null;
      }
    },
    pauseAnimation() {
      return this.activeScreen !== this.screens.WELCOME;
    },
  },
  methods: {
    slideTo(screenName) {
      const destinationScreen = this.screens[screenName];
      const isPreviousScreen = this.activeScreen > destinationScreen;
      this.slideDirection = isPreviousScreen ? 'moveright' : 'moveleft';
      this.activeScreen = destinationScreen;
    },
    setColour(colour) {
      setTimeout(() => { this.bgColour = colour; }, 150);
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
