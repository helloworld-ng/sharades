<template>
  <section id="preferences" class="frame">
    <header>
      <div class="title">{{ gameCategory.label }}</div>
    </header>
    <article>
      <ul class="preferences">
        <li>
          <number-picker :minValue="2" label="Teams" v-model="teams" @input="updateGame('teams')" />
        </li>
        <li>
          <number-picker :minValue="2" label="Turns"
           v-model="turnsPerTeam" @input="updateGame('turnsPerTeam')" />
        </li>
      </ul>
    </article>
    <footer>
      <span>
        <round-button text="Next" size="small" @click="startGame()"
        />
      </span>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NumberPicker from '../global/Picker/NumberPicker.vue';
import RoundButton from '../global/RoundButton.vue';

export default {
  name: 'Preferences',
  components: {
    NumberPicker,
    RoundButton,
  },
  computed: {
    ...mapGetters([
      'gameDifficulties',
      'backgroundColour',
      'gameConfig',
      'gameCategory',
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
  width: 240px;
  max-height: 330px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > li {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
