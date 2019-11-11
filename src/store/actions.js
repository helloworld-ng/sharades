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
  populateWordBank({ commit }) {
    // const { category, difficulty } = state.gameConfig;
    // const words = getWords({ category, difficulty });
    const words = getWords({});
    commit('populateWordBank', words);
  },
  startGame({ state, commit, dispatch }) {
    dispatch('populateWordBank');
    const { teams, turnsPerTeam, turnDuration } = state.gameConfig;
    commit('registerTurns', { teams, turnsPerTeam, turnDuration });
    dispatch('setNextTurnActive');
    dispatch('changeActingWord');
    dispatch('changeComponent', 'Game');
  },
  setNextTurnActive({ state }) {
    const nextTurn = state.gameTurns.find(turn => !turn.started);
    nextTurn.ready();
  },
  playActiveTurn({ getters }) {
    return new Promise(async (resolve) => {
      await getters.activeTurn.countdown();
      resolve();
    });
  },
  readyNextTurn({ dispatch }) {
    dispatch('endPreviousTurn');
    dispatch('setNextTurnActive');
    dispatch('changeActingWord');
  },
  endPreviousTurn({ getters }) {
    if (getters.activeTurn) {
      getters.activeTurn.end();
    }
  },
  skipWord({ commit, dispatch }, word) {
    commit('addToUsedPile', word);
    dispatch('changeActingWord');
  },
  saveCorrectGuess({ commit, dispatch, getters }, word) {
    commit('saveCorrectGuessToTurn', {
      turn: getters.activeTurn,
      word,
    });
    commit('addToUsedPile', word);
    if (!getters.activeTurn.completed) {
      commit('addToDiscardPile', word);
      dispatch('changeActingWord');
    }
  },
  undoCorrectGuess({ commit, getters }, word) {
    commit('removeCorrectGuess', {
      turn: getters.activeTurn,
      word,
    });
    commit('removeFromDiscardPile', word);
  },
  changeActingWord({ state, commit, getters }) {
    if (state.wordBank.length === 0) {
      commit('populateWordBank');
    }
    const { usedWords } = getters.activeTurn;
    const pool = state.wordBank.filter(word => !usedWords.includes(word));
    const randomIndex = Math.ceil(Math.random(0, 1) * pool.length) - 1;
    const word = pool[randomIndex];
    commit('setActingWord', word);
    commit('saveUsedWordToTurn', {
      turn: getters.activeTurn,
      word,
    });
  },
};
