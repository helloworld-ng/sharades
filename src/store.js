import Vue from 'vue';
import Vuex from 'vuex';
import animationSequence from './data/app/animation-sequence';
import viewOrder from './data/app/view-order';
import gameCategories from './data/game/categories';
import gameDifficulties from './data/game/difficulties';

Vue.use(Vuex);

const appConfig = {
  view: 'welcome',
  transitionDirection: 'moveright',
  backgroundColour: animationSequence[0].backgroundColour,
};

const gameConfig = {
  difficulty: 'easy',
  category: null,
  teams: 2,
  turnsPerTeam: 2,
};

function Turn(team, count) {
  this.team = team;
  this.count = count;
  this.started = false;
  this.timeLeft = 60;
  this.correctGuesses = [];
  this.startTimer = () => {
    const turnTimer = setTimeout(() => {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) {
        window.clearTimeout(turnTimer);
      }
    }, 1000);
  };
  this.saveCorrectGuess = (word) => {
    this.correctGuesses.push(word);
  };
}

export default new Vuex.Store({
  state: {
    appConfig,
    gameConfig,
    gameTurns: [],
    wordBank: [],
    discardPile: [],
    actingWord: null,
  },
  getters: {
    view: state => state.appConfig.view,
    animationSequence: () => animationSequence,
    backgroundColour: state => state.appConfig.backgroundColour,
    transitionDirection: state => state.appConfig.transitionDirection,
    gameCategories: () => gameCategories,
    gameDifficulties: () => gameDifficulties,
    gameConfig: state => state.gameConfig,
    gameCategory: state => gameCategories.find(cat => cat.id === state.gameConfig.category),
    gameInProgress: (state) => {
      const gameViews = ['gameTurn', 'gameStats'];
      return gameViews.includes(state.appConfig.view);
    },
    activeTurn: state => state.gameTurns.find(turn => !turn.started),
  },
  mutations: {
    configureApp(state, { key, value }) {
      state.appConfig[key] = value;
    },
    configureGame(state, { key, value }) {
      state.gameConfig[key] = value;
    },
    registerTurns(state, { teams, turnsPerTeam }) {
      for (let turnCount = 1; turnCount <= turnsPerTeam; turnCount += 1) {
        for (let team = 1; team <= teams; team += 1) {
          state.gameTurns.push(new Turn(team, turnCount));
        }
      }
    },
    saveWordsForGame(state) {
      state.wordBank = ['One', 'Two', 'Three'];
    },
    setActingWord(state, actingWord) {
      state.actingWord = actingWord;
    },
    addToDiscardPile(state, word) {
      state.discardPile.push(word);
    },
    removeFromWordBank(state, wordToRemove) {
      state.wordBank = state.wordBank.filter(word => word !== wordToRemove);
    },
  },
  actions: {
    saveBackgroundColour({ commit }, value) {
      commit('configureApp', { key: 'backgroundColour', value });
    },
    changeView({ state, commit }, nextView) {
      if (viewOrder[nextView] !== undefined) {
        const currentViewIndex = viewOrder[state.appConfig.view];
        const nextViewIndex = viewOrder[nextView];
        const transitionDirection = nextViewIndex > currentViewIndex ? 'moveleft' : 'moveright';
        commit('configureApp', { key: 'transitionDirection', value: transitionDirection });
        commit('configureApp', { key: 'view', value: nextView });
      }
    },
    saveGamePreference({ commit }, changes) {
      Object.keys(changes).forEach((key) => {
        commit('configureGame', { key, value: changes[key] });
      });
      commit('saveWordsForGame');
    },
    startGame({ state, commit }) {
      const { teams, turnsPerTeam } = state.gameConfig;
      commit('registerTurns', { teams, turnsPerTeam });
      commit('setAppState', 'gameTurn');
    },
    startCurrentTurn({ state, dispatch }) {
      dispatch('setActingWord');
      state.currentTurn.startTimer();
    },
    saveCorrectGuess({ state, dispatch }) {
      state.currentTurn.saveCorrectGuess(state.actingWord);
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
  },
});
