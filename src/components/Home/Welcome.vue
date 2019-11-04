<template>
  <section id="welcome">
    <main>
      <round-button text="Play" :colour="backgroundColor" @click="$emit('clickedPlay')" />
    </main>
    <footer>
      <a @click="goToScreen('ABOUT')">About</a>
      <a @click="goToScreen('TUTORIAL')">Tutorial</a>
    </footer>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import RoundButton from '../shared/RoundButton.vue';

export default {
  name: 'Welcome',
  components: {
    RoundButton,
  },
  methods: mapActions([
    'backgroundColor',
    'goToScreen',
  ]),
};
</script>


<style scoped lang="scss">
@import '../../scss/_colours';

section {
  height: 100%;
  display: flex;
  flex-direction: column;
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
