<template>
  <div class="list">
    <ul>
      <li v-for="item in items" :key="item">
        <a class="h2" @click="choose(item)">
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    items: Array,
  },
  methods: {
    choose(item) {
      this.$emit('choose', item);
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../assets/colours.scss';

.list {
  ul {
    list-style: none;
    text-align: center;
    margin: 30px 0;
    padding: 0;
    > li {
      margin-bottom: 15px;
      a {
        color: $yellow;
      }
    }
  }
}
</style>
