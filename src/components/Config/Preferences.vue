<template>
  <section id="preferences" class="frame">
    <article>
      <ul class="preferences">
        <li>
          <number-picker label="Teams" v-model="teams" @input="updateGame('teams')" />
        </li>
        <li>
          <number-picker label="Turns" v-model="turnsPerTeam" @input="updateGame('turnsPerTeam')" />
        </li>
        <li>
          <word-picker label="Mode" :options="gameDifficulties"
           v-model="difficulty" @input="updateGame('difficulty')" />
        </li>
      </ul>
    </article>
    <footer>
      <span>
        <round-button text="Start" size="small" :textColour="backgroundColour"
         @click="startGame()" />
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
  name: 'Preferences',
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
      'saveGamePreference',
      'startGame',
    ]),
    updateGame(key) {
      this.saveGamePreference({
        key,
        value: this[key],
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/layout/frame';

.preferences {
  flex: 1;
  list-style: none;
  text-align: center;
  padding: 15px 0 30px;
  width: 240px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > li {
    text-align: center;
  }
}
</style>
