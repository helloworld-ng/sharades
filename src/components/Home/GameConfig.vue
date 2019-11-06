<template>
  <section id="config" class="config">
    <main>
      <ul class="config__list">
        <li>
          <number-picker label="Teams" v-model="teams" @input="updateConfig()" />
        </li>
        <li>
          <number-picker label="Turns" v-model="turnsPerTeam" @input="updateConfig()" />
        </li>
        <li>
          <word-picker label="Mode" :options="gameDifficulties"
          v-model="difficulty" @input="updateConfig()" />
        </li>
      </ul>
    </main>
    <footer>
      <span>
        <round-button text="Start" size="small" :textColour="backgroundColour"
         @click="startGame" />
      </span>
    </footer>
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
      'startGame',
    ]),
    updateConfig() {
      const { difficulty, teams, turnsPerTeam } = this;
      this.configureGame({ difficulty, teams, turnsPerTeam });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/section';

.config {
  &__list {
    flex: 1;
    list-style: none;
    text-align: center;
    padding: 30px;
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
