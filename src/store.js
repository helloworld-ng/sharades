import Vue from 'vue';
import Vuex from 'vuex';
import appStates from './data/app/app-states';
import homeScreens from './data/app/home-screens';
import animationSequence from './data/app/animation-sequence';
import gameCategories from './data/game/categories';
import gameDifficulties from './data/game/difficulties';

Vue.use(Vuex);

const appState = appStates[0].id;

const homeConfig = {
  backgroundColour: animationSequence[0].backgroundColour,
  currentScreen: homeScreens[0].id,
  transitionDirection: null,
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
    appState,
    homeConfig,
    gameConfig,
    gameTurns: [],
    wordBank: [],
    discardPile: [],
    actingWord: null,
  },
  getters: {
    appStates: () => appStates,
    gameCategories: () => gameCategories,
    homeScreens: () => homeScreens,
    gameDifficulties: () => gameDifficulties,
    animationSequence: () => animationSequence,
    appState: state => state.appState,
    homeScreen: state => state.homeConfig.currentScreen,
    backgroundColour: state => state.homeConfig.backgroundColour,
    transitionDirection: state => state.homeConfig.transitionDirection,
    gameConfig: state => state.gameConfig,
    activeTurn: state => state.gameTurns.find(turn => !turn.started),
  },
  mutations: {
    setAppState(state, newState) {
      state.appState = newState;
    },
    configureHomeScreen(state, { key, value }) {
      state.homeConfig[key] = value;
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
    goToScreen({ state, commit }, screenId) {
      const currentScreen = homeScreens
        .find(screen => screen.id === state.homeConfig.currentScreen);
      const destinationScreen = homeScreens.find(screen => screen.id === screenId);
      if (destinationScreen) {
        const isNextScreen = destinationScreen.level > currentScreen.level;
        const transitionDirection = isNextScreen ? 'moveleft' : 'moveright';
        commit('configureHomeScreen', { key: 'transitionDirection', value: transitionDirection });
        commit('configureHomeScreen', { key: 'currentScreen', value: screenId });
      }
    },
    configureHomeScreen({ commit }, changes) {
      Object.keys(changes).forEach((key) => {
        commit('configureHomeScreen', { key, value: changes[key] });
      });
    },
    configureGame({ commit }, changes) {
      Object.keys(changes).forEach((key) => {
        commit('configureGame', { key, value: changes[key] });
      });
      commit('saveWordsForGame');
    },
    startGame({ state, commit }) {
      const { teams, turnsPerTeam } = state.gameConfig;
      commit('registerTurns', { teams, turnsPerTeam });
      commit('setAppState', 'turnInProgress');
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
