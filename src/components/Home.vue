<template>
  <div class="home">
    <intro />
    <div class="top">
      <logomark />
    </div>
    <div class="middle">
      <door sign="play" />
    </div>
    <div class="bottom">
      <a>About</a>
      <a>Gameplay</a>
    </div>
  </div>
</template>

<script>
import Logomark from './Logomark.vue';
import Door from './Door.vue';
import Intro from './Intro.vue';

export default {
  name: 'Home',
  components: {
    Logomark,
    Door,
    Intro,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/colors.scss';

.home {
  padding: 30px 30px 30px;
  background: $green;
  height: 100%;
  display: flex;
  flex-direction: column;
  .middle {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bottom {
    a:last-child {
      float: right;
    }
  }
}
a {
  color: $yellow;
}

</style>
