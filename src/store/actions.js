import componentOrder from '../data/component-order';
import getTransition from '../helpers/get-transition';
import getWords from '../helpers/get-words';

export default {
  saveBackgroundColour({ commit }, value) {
    commit('setBackgroundColour', value);
  },
  changeComponent({ state, commit }, component) {
    if (componentOrder[component] !== undefined) {
      const transition = getTransition(state.appConfig.activeComponent, component);
      commit('setActiveComponent', { component, transition });
    }
  },
  saveGamePreference({ commit }, { key, value }) {
    commit('configureGame', { key, value });
  },
  saveWordsForGame({ commit }) {
    // const { category, difficulty } = state.gameConfig;
    // const words = getWords({ category, difficulty });
    const words = getWords({});
    commit('saveWordsForGame', words);
  },
  startGame({ state, commit, dispatch }) {
    dispatch('saveWordsForGame');
    const { teams, turnsPerTeam, turnDuration } = state.gameConfig;
    commit('registerTurns', { teams, turnsPerTeam, turnDuration });
    dispatch('changeComponent', 'Game');
  },
  playTurn({ getters, dispatch }) {
    return new Promise(async (resolve) => {
      dispatch('setActingWord');
      await getters.activeTurn.countdownTurn();
      resolve();
    });
  },
  skipWord({ commit, dispatch, getters }, word) {
    commit('saveWordToTurn', getters.activeTurn);
    commit('addToUsedPile', word);
    dispatch('changeActingWord');
  },
  correctlyGuessed({ commit, dispatch, getters }, word) {
    commit('saveCorrectGuess', getters.activeTurn);
    commit('addToUsedPile', word);
    commit('addToDiscardPile', word);
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
    commit('removeFromWordBank', state.actingWord);
    dispatch('setActingWord');
  },
  resetWords({ dispatch }) {
    dispatch('saveWordsForGame');
  },
};
