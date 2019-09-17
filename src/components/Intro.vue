<template>
  <div class="intro">
    <div class="lines to-right blue"></div>
    <div class="lines to-top red"></div>
    <div class="lines to-left red"></div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: {
    sign: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/colors.scss';

.intro {}
</style>
