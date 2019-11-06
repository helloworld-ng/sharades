<template>
  <section id="welcome">
    <main>
      <round-button text="Play" :textColour="backgroundColour" @click="$emit('clickedPlay')" />
    </main>
    <footer>
      <span><a @click="goToScreen('ABOUT')">About</a></span>
      <span><a @click="goToScreen('TUTORIAL')">Tutorial</a></span>
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
@import '../../scss/section';

main {
  align-items: center;
}
</style>
