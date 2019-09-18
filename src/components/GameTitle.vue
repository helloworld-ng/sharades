<template>
  <div class="title">
    <div class="wordmark"><img src="../assets/images/Yellow-Sharades-Wordmark.svg"></div>
    <span>{{title || 'Nigerian Charades'}}</span>
  </div>
</template>

<script>
export default {
  name: 'GameTitle',
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.title {
  text-align: center;
  color: $yellow;
  margin-top: 30px;
}
</style>
