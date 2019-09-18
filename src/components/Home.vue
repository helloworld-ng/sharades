<template>
  <section class="home">
    <div class="background">
      <cover @newBackground="setColour" :paused="activeScreen !== screens.WELCOME" />
    </div>
    <section class="frame">
      <header>
        <wordmark :sign="wordmarkText" />
      </header>
      <section class="body">
        <transition :name="direction" mode="out-in">
          <div key="nav" id="nav" v-if="activeScreen === screens.WELCOME">
            <div class="centered">
              <round-button sign="play" :colour="colour" @click="showCategories" />
            </div>
          </div>
          <div key="category" id="category" v-if="activeScreen === screens.CATEGORY">
            <category @choose="setCategory" />
          </div>
          <div key="config" id="config" v-if="activeScreen === screens.CONFIG">
            Config
          </div>
          <div key="about" id="about" v-if="activeScreen === screens.ABOUT"></div>
          <div key="tutorial" id="tutorial" v-if="activeScreen === screens.TUTORIAL"></div>
        </transition>
      </section>
      <footer class="links">
        <div v-if="activeScreen === screens.WELCOME">
          <a>About</a>
          <a>Tutorial</a>
        </div>
        <div v-if="activeScreen === screens.CATEGORY">
          <a @click="showWelcome()">Back</a>
          <a @click="chooseRandomCategory()">Random</a>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Wordmark from './Wordmark.vue';
import RoundButton from './RoundButton.vue';
import Cover from './Cover.vue';
import Category from './Category.vue';

export default {
  name: 'Home',
  components: {
    Wordmark,
    RoundButton,
    Cover,
    Category,
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
      introPlayed: false,
      screens,
      activeScreen: screens.WELCOME,
      wordmarkText: null,
      colour: null,
      direction: null,
      config: {},
    };
  },
  computed: {
    ...mapGetters([
      'allCategories',
    ]),
    categories() {
      return Object.values(this.allCategories).map(cat => ({ name: cat }));
    },
  },
  methods: {
    slideTo(screenName) {
      const destinationScreen = this.screens[screenName];
      const isPreviousScreen = this.activeScreen > destinationScreen;
      this.direction = isPreviousScreen ? 'moveright' : 'moveleft';
      this.activeScreen = destinationScreen;
    },
    showWelcome() {
      this.wordmarkText = null;
      this.slideTo('WELCOME');
    },
    setColour(colour) {
      setTimeout(() => { this.colour = colour; }, 150);
    },
    showCategories() {
      this.wordmarkText = 'Choose Category';
      this.pauseAnimation = true;
      this.slideTo('CATEGORY');
    },
    setCategory(category) {
      this.wordmarkText = category;
      this.config.category = category;
      this.slideTo('CONFIG');
    },
    chooseRandomCategory() {
      const randomIndex = Math.ceil(Math.random(0, 1) * this.categories.length) - 1;
      this.config.category = this.categories[randomIndex];
      this.slideTo('CONFIG');
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
