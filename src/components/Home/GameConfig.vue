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
        <word-picker label="Difficulty" :options="difficultiesArray"
         v-model="difficulty" @change="updateConfig" />
      </li>
      <li>
        <round-button text="Start" size="small" :colour="backgroundColor" />
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
      'backgroundColor',
      'gameConfig',
      'difficulties',
    ]),
    difficultiesArray() {
      return Object.keys(this.difficulties).map(key => ({ key, value: this.difficulties[key] }));
    },
  },
  data() {
    const { difficulty, teams, turnsPerTeam } = this.gameConfig;
    return { difficulty, teams, turnsPerTeam };
  },
  methods: {
    ...mapActions([
      'setGameConfig',
    ]),
    updateConfig(key) {
      const config = {};
      config[key] = this[key];
      this.setGameConfig(config);
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
