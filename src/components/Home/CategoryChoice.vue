<template>
  <section id="choose-category">
    <main>
      <list :items="gameCategories" @click="setCategory" />
    </main>
    <footer>
      <span><a @click="chooseRandom()">Random</a></span>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import List from '../shared/List.vue';

export default {
  name: 'CategoryChoice',
  components: {
    List,
  },
  computed: {
    ...mapGetters([
      'gameCategories',
    ]),
  },
  methods: {
    ...mapActions([
      'configureGame',
      'goToScreen',
    ]),
    setCategory(category) {
      this.configureGame({ category });
      this.$emit('setCategory');
    },
    chooseRandom() {
      const randomIndex = Math.ceil(Math.random(0, 1) * this.gameCategories.length) - 1;
      const { id } = this.gameCategories[randomIndex];
      this.setCategory(id);
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../scss/section';
</style>
