<template>
  <div class="config">
    <ul>
      <li>
        <toggle label="teams" v-model="config.teams" />
      </li>
      <li>
        <toggle label="turns" v-model="config.turnsPerTeam" />
      </li>
      <li>
        <toggle label="mode" v-model="config.turnsPerTeam" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toggle from '../Config/Toggle.vue';

export default {
  name: 'Config',
  components: {
    Toggle,
  },
  computed: {
    ...mapGetters([
      'config',
    ]),
  },
};
</script>


<style scoped lang="scss">
@import '../../assets/colours.scss';

.config {
  ul {
    list-style: none;
    padding: 0;
    li {
      margin: 15px;
    }
  }
}
</style>
