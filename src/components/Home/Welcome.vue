<template>
  <section id="welcome" class="frame">
    <article>
      <round-button text="Play" :textColour="backgroundColour" @click="$emit('play')" />
    </article>
    <footer>
      <span><a @click="changeView('about')">About</a></span>
      <span><a @click="changeView('gameplay')">Gameplay</a></span>
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
</style>
