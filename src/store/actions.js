import componentOrder from '../data/component-order';
import getTransition from '../helpers/get-transition';

export default {
  saveBackgroundColour({ commit }, value) {
    commit('setBackgroundColour', value);
  },
  changeView({ state, commit }, component) {
    if (componentOrder[component] !== undefined) {
      const transition = getTransition(state.appConfig.activeComponent, component);
      commit('setActiveComponent', { component, transition });
    }
  },
  saveGamePreference({ commit }, { key, value }) {
    commit('configureGame', { key, value });
  },
  startGame({ state, commit, dispatch }) {
    commit('saveWordsForGame');
    const { teams, turnsPerTeam, turnDuration } = state.gameConfig;
    commit('registerTurns', { teams, turnsPerTeam, turnDuration });
    dispatch('changeView', 'Turn');
  },
  async startActiveTurn({ getters, dispatch }) {
    if (!getters.activeTurn.started) {
      dispatch('setActingWord');
      await getters.activeTurn.countdown();
      dispatch('changeView', 'Stats');
    }
  },
  saveCorrectGuess({ state, getters, dispatch }) {
    getters.activeTurn.saveCorrectGuess(state.actingWord);
    dispatch('changeActingWord');
  },
  async setActingWord({ state, commit, dispatch }) {
    if (state.wordBank.length === 0) {
      await dispatch('resetWords');
    }
    const randomIndex = Math.ceil(Math.random(0, 1) * state.wordBank.length) - 1;
    commit('setActingWord', state.wordBank[randomIndex]);
  },
  changeActingWord({ state, commit, dispatch }) {
    commit('addToDiscardPile', state.actingWord);
    commit('removeFromWordBank', state.actingWord);
    dispatch('setActingWord');
  },
  resetWords({ commit }) {
    commit('saveWordsForGame');
  },
};
