<template>
  <section id="preferences" class="preferences">
    <main>
      <ul class="preferences__list">
        <li>
          <number-picker label="Teams" v-model="teams" @input="updateGame()" />
        </li>
        <li>
          <number-picker label="Turns" v-model="turnsPerTeam" @input="updateGame()" />
        </li>
        <li>
          <word-picker label="Mode" :options="gameDifficulties"
          v-model="difficulty" @input="updateGame()" />
        </li>
      </ul>
    </main>
    <footer>
      <span>
        <round-button text="Start" size="small" :textColour="backgroundColour"
         @click="$emit('done')" />
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
    ]),
    updateGame() {
      const { difficulty, teams, turnsPerTeam } = this;
      this.saveGamePreference({ difficulty, teams, turnsPerTeam });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/layout/frame';

.preferences {
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
