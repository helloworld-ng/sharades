<template>
  <section id="config" class="config">
    <ul class="config__list">
      <li>
        <number-picker label="Teams" v-model="teams" @change="updateConfig" />
      </li>
      <li>
        <number-picker label="Turns" v-model="turnsPerTeam" @change="updateConfig" />
      </li>
      <li>
        <word-picker label="Difficulty" :options="gameDifficulties"
         v-model="difficulty" @change="updateConfig" />
      </li>
      <li>
        <round-button text="Start" size="small" :textColour="backgroundColour" />
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
      'gameDifficulties',
      'backgroundColour',
      'gameConfig',
    ]),
  },
  data() {
    const { difficulty, teams, turnsPerTeam } = this.$store.getters.gameConfig;
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
@import '../../scss/colours';

.config {
  padding: 15px 30px 45px;
  &__list {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    > li {
      margin-bottom: 30px;
      text-align: center;
      &:last-child {
        margin-top: 45px;
      }
    }
  }
}
</style>
