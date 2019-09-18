<template>
  <a :class="className">
    {{ sign }}
  </a>
</template>

<script>
export default {
  name: 'Door',
  props: {
    sign: String,
    colour: String,
  },
  computed: {
    className() {
      return `door ${this.colour}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/colours.scss';

.door {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: $yellow;
  color: $green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Ultra Compressed';
  font-size: 48px;
  &.green {
    color: $green;
  }
  &.blue {
    color: $blue;
  }
  &.red {
    color: $red;
  }
}
</style>
