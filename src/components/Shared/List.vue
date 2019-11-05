<template>
  <div class="list">
    <ul>
      <li v-for="item in items" :key="get(item, 'value')">
        <a class="h2" @click="click(item)">
          {{ get(item, 'label') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    items: Array,
    label: String,
    value: String,
  },
  methods: {
    get(item, property) {
      return typeof item === 'object' ? item[this[property]] : item;
    },
    click(item) {
      this.$emit('click', this.get(item, 'value'));
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../scss/colours';

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
