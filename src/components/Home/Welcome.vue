<template>
  <section id="welcome">
    <main>
      <round-button text="Play" :textColour="backgroundColour" @click="$emit('clickedPlay')" />
    </main>
    <footer>
      <span><a @click="changeView('about')">About</a></span>
      <span><a @click="changeView('tutorial')">Gameplay</a></span>
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
    'changeView',
  ]),
};
</script>


<style scoped lang="scss">
@import '../../scss/layout/frame';

main {
  align-items: center;
}
</style>
