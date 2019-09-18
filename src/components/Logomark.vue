<template>
  <div class="logomark">
    <h1>Sharades</h1>
    <span>{{title || 'Nigerian Charades'}}</span>
  </div>
</template>

<script>
export default {
  name: 'Logomark',
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
@import '../assets/colours.scss';

.logomark {
  text-align: center;
  color: $yellow;
}
</style>
