<template>
  <section class="home">
    <div class="background">
      <cover @newBackground="setColour" />
    </div>
    <div class="frame">
      <div class="top">
        <logomark />
      </div>
      <div class="middle">
        <door sign="play" :colour="colour" />
      </div>
      <div class="bottom">
        <a>About</a>
        <a>Gameplay</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logomark from './Logomark.vue';
import Door from './Door.vue';
import Cover from './Cover.vue';

export default {
  name: 'Home',
  components: {
    Logomark,
    Door,
    Cover,
  },
  data() {
    return {
      introPlayed: false,
      colour: null,
    };
  },
  methods: {
    setColour(colour) {
      setTimeout(() => { this.colour = colour; }, 150);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .frame {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 2;
    .middle {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bottom {
      a {
        color: $yellow;
        &:last-child {
          float: right;
        }
      }
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
