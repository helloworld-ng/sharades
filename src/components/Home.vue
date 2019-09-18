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
        <transition-group>
          <div key="nav" id="nav" v-if="activeScreen === screens.NAVIGATION">
            <div class="centered">
              <round-button sign="play" :colour="colour" @click="showCategories" />
            </div>
            <div class="links">
              <a>About</a>
              <a>Tutorial</a>
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
        </transition-group>
      </section>
    </section>
  </section>
</template>

<script>
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
      NAVIGATION: 0,
      CATEGORY: 1,
      CONFIG: 2,
      ABOUT: 3,
      TUTORIAL: 4,
    };

    return {
      wordmarkText: null,
      introPlayed: false,
      colour: null,
      pauseAnimation: false,
      screens,
      activeScreen: screens.NAVIGATION,
      config: {},
    };
  },
  methods: {
    setColour(colour) {
      setTimeout(() => { this.colour = colour; }, 150);
    },
    showCategories() {
      this.wordmarkText = 'Choose Category';
      this.pauseAnimation = true;
      this.activeScreen = this.screens.CATEGORY;
    },
    setCategory(category) {
      this.config.category = category;
      this.showConfig();
    },
    showConfig() {
      this.activeScreen = this.screens.CONFIG;
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
    > span, > span > div {
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
