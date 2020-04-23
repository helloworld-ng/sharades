<template>
  <section id="choose-category" class="frame">
    <header>
      <div class="title">Choose a category</div>
    </header>
    <article>
      <list :items="gameCategories" @click="setCategory" />
    </article>
    <footer>
      <span><a @click="chooseRandom()">Random</a></span>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import List from '../global/List.vue';

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
      'saveGamePreference',
      'changeComponent',
    ]),
    setCategory(category) {
      this.saveGamePreference({ key: 'category', value: category });
      this.changeComponent('Preferences');
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
@import '../../scss/layout/frame';
</style>
