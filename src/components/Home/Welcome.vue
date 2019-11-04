<template>
  <section id="welcome">
    <main>
      <round-button text="Play" :textColour="backgroundColour" @click="$emit('clickedPlay')" />
    </main>
    <footer>
      <a @click="goToScreen('ABOUT')">About</a>
      <a @click="goToScreen('TUTORIAL')">Tutorial</a>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoundButton from '../shared/RoundButton.vue';

export default {
  name: 'Welcome',
  components: {
    RoundButton,
  },
  computed: mapGetters([
    'backgroundColour',
  ]),
  methods: mapActions([
    'goToScreen',
  ]),
};
</script>


<style scoped lang="scss">
@import '../../scss/colours';

section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

footer {
  a {
    color: $yellow;
    &:last-child {
      float: right;
    }
  }
}
</style>
