<template>
  <section id="welcome" class="frame">
    <article>
      <round-button text="Play" @click="changeComponent('Category')" />
    </article>
    <footer>
      <span><a @click="changeComponent('About')">About</a></span>
      <span><a @click="changeComponent('Gameplay')">Gameplay</a></span>
    </footer>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import RoundButton from '../global/RoundButton.vue';

export default {
  name: 'Welcome',
  components: {
    RoundButton,
  },
  methods: mapActions([
    'changeComponent',
  ]),
};
</script>


<style scoped lang="scss">
@import '../../scss/layout/frame';
</style>
