<template>
  <section id="config">
    <ul>
      <li>
        <number-picker label="Teams" v-model="teams" @change="updateConfig" />
      </li>
      <li>
        <number-picker label="Turns" v-model="turnsPerTeam" @change="updateConfig" />
      </li>
      <li>
        <word-picker label="Difficulty" :options="difficulties"
         v-model="difficulty" @change="updateConfig" />
      </li>
      <li>
        <round-button text="Start" size="small" :colour="backgroundColour" />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NumberPicker from '../shared/Picker/NumberPicker.vue';
import WordPicker from '../shared/Picker/WordPicker.vue';
import RoundButton from '../shared/RoundButton.vue';

export default {
  name: 'GameConfig',
  components: {
    NumberPicker,
    WordPicker,
    RoundButton,
  },
  computed: {
    ...mapGetters([
      'backgroundColour',
      'gameConfig',
      'GAME_DIFFICULTIES',
    ]),
    difficulties() {
      return Object.keys(this.GAME_DIFFICULTIES)
        .map(key => ({ key, value: this.GAME_DIFFICULTIES[key] }));
    },
  },
  data() {
    const { difficulty, teams, turnsPerTeam } = this.gameConfig;
    return { difficulty, teams, turnsPerTeam };
  },
  methods: {
    ...mapActions([
      'configureGame',
    ]),
    updateConfig(key) {
      const update = {};
      update[key] = this[key];
      this.configureGame(update);
    },
  },
};
</script>

<style scoped lang="scss">
.config {
  ul {
    list-style: none;
    text-align: center;
    > li {
      margin-bottom: 15px;
    }
  }
}
</style>
