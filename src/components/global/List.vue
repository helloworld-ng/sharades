<template>
  <div class="list">
    <ul>
      <li v-for="item in items" :key="get(item, 'valueProp')">
        <a @click="click(item)">
          {{ get(item, 'labelProp') }}
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
    valueProp: {
      type: String,
      default: 'id',
    },
    labelProp: {
      type: String,
      default: 'label',
    },
  },
  methods: {
    get(item, property) {
      return typeof item === 'object' ? item[this[property]] : item;
    },
    click(item) {
      this.$emit('click', this.get(item, 'valueProp'));
    },
  },
};
</script>


<style scoped lang="scss">
@import '../../scss/colours';
@import '../../scss/textstyles';

.list {
  ul {
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
    > li {
      margin-bottom: 10px;
      a {
        color: $yellow;
        text-transform: uppercase;
        @include header(3);
      }
    }
  }
}
</style>
