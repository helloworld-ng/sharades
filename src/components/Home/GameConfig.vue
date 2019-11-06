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
        <word-picker label="Mode" :options="gameDifficulties"
         v-model="difficulty" @change="updateConfig" />
      </li>
    </ul>
    <div class="config__start">
      <round-button text="Start" size="small" :textColour="backgroundColour" />
    </div>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  &__start {
    height: 100px;
    text-align: center;
  }
  &__list {
    flex: 1;
    list-style: none;
    text-align: center;
    padding: 15px 30px 45px;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > li {
      text-align: center;
    }
  }
}
</style>
