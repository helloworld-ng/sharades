<template>
  <section id="choose-category">
    <main>
      <list :items="categoryArray" label="name" value="key" @click="setCategory" />
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
      'categories',
    ]),
    categoryArray() {
      return Object.keys(this.categories).map(key => ({ key, name: this.categories[key] }));
    },
  },
  methods: {
    ...mapActions([
      'setGameConfig',
    ]),
    setCategory(category) {
      this.setGameConfig({ category });
      this.$emit('next');
    },
    chooseRandom() {
      const randomIndex = Math.ceil(Math.random(0, 1) * this.categoryArray.length) - 1;
      const { key } = this.categoryArray[randomIndex];
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
