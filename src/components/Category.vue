<template>
  <div class="category">
    <ul>
      <li v-for="cat in categories" :key="cat.name">
        <a @click="$emit('choose', cat.name)">
          {{ cat.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Category',
  computed: {
    ...mapGetters([
      'allCategories',
    ]),
    categories() {
      return Object.values(this.allCategories).map(cat => ({ name: cat }));
    },
  },
};
</script>


<style scoped lang="scss">
@import '../assets/colours.scss';

.category {
  ul {
    list-style: none;
    text-align: center;
    margin: 30px 0;
    padding: 0;
    > li {
      margin-bottom: 15px;
      a {
        color: $yellow;
        font-family: 'Helvetica Ultra Compressed';
        font-weight: normal;
        letter-spacing: 0;
        font-size: 55px;
      }
    }
  }
}
</style>
