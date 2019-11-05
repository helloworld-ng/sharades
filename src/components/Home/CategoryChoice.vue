<template>
  <section id="choose-category">
    <main>
      <list :items="gameCategories" @click="setCategory" />
    </main>
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
      const randomIndex = Math.ceil(Math.random(0, 1) * this.categories.length) - 1;
      const { key } = this.categories[randomIndex];
      this.setCategory(key);
    },
  },
};
</script>


<style scoped lang="scss">
section {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
