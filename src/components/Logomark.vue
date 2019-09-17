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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/colors.scss';

.logomark {
  text-align: center;
  color: $yellow;
}
</style>
