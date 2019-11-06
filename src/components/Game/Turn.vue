<template>
  <section class="turn">
    <header>{{ currentTurn.timer }}</header>
    <main>
      <div class="turn__label">{{ label }}</div>
      <div class="turn__word">{{ word }}</div>
    </main>
    <footer>
      <span><a @click="startTimer()">Start</a></span>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Turn',
  computed: {
    ...mapGetters([
      'currentTurn',
    ]),
    label() {
      const teamId = `Team ${this.currentTurn.team}`;
      return this.currentTurn.started ? 'You\'re acting' : teamId;
    },
    word() {
      return 'Ready';
    },
  },
  methods: {
    startTimer() {
      // Start here
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/section';
</style>
