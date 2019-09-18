<template>
  <div class="wordmark">
    <div><img src="../assets/images/Yellow-Sharades-Wordmark.svg"></div>
    <span>{{title || 'Nigerian Charades'}}</span>
  </div>
</template>

<script>
export default {
  name: 'Wordmark',
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.wordmark {
  text-align: center;
  color: $yellow;
  margin-top: 30px;
}
</style>
