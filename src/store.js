import Vue from 'vue';
import Vuex from 'vuex';
import animationSequence from './data/app/animation-sequence';
import componentOrder from './data/app/component-order';
import gameCategories from './data/game/categories';
import gameDifficulties from './data/game/difficulties';

Vue.use(Vuex);

const appConfig = {
  // activeComponent: 'Welcome',
  // transition: null,
  activeComponent: 'Preferences',
  transition: 'moveleft',
  backgroundColour: animationSequence[0].backgroundColour,
};

const gameConfig = {
  difficulty: 'easy',
  // category: null,
  category: 'music',
  teams: 2,
  turnsPerTeam: 2,
};

function Turn(team, count) {
  this.team = team;
  this.count = count;
  this.started = false;
  this.completed = false;
  this.timeLeft = 60000;
  this.correctGuesses = [];
  this.countdown = () => new Promise((resolve) => {
    this.started = true;
    const turnCounter = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) {
        this.completed = true;
        window.clearInterval(turnCounter);
        resolve();
      }
    }, 1000);
  });
  this.saveCorrectGuess = (word) => {
    this.correctGuesses.push(word);
  };
}

const getTransitionBetween = (previous, next) => {
  const previousIndex = componentOrder[previous];
  const nextIndex = componentOrder[next];
  return nextIndex > previousIndex ? 'moveleft' : 'moveright';
};

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
    animationSequence: () => animationSequence,
    gameCategories: () => gameCategories,
    gameDifficulties: () => gameDifficulties,
    activeComponent: state => state.appConfig.activeComponent,
    backgroundColour: state => state.appConfig.backgroundColour,
    transition: state => state.appConfig.transition,
    gameConfig: state => state.gameConfig,
    gameCategory: state => gameCategories.find(cat => cat.id === state.gameConfig.category),
    gameInProgress: (state) => {
      const gameComponents = ['Turn', 'Stats'];
      return gameComponents.includes(state.appConfig.activeComponent);
    },
    activeTurn: state => state.gameTurns.find(turn => !turn.completed),
    actingWord: state => state.actingWord,
  },
  mutations: {
    setBackgroundColour(state, colour) {
      state.appConfig.backgroundColour = colour;
    },
    setActiveComponent(state, { transition, component }) {
      state.appConfig.transition = transition || 'moveleft';
      state.appConfig.activeComponent = component;
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
      state.wordBank = ['Mami Water', 'Danfo', 'Cut Your Hand'];
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
      commit('setBackgroundColour', value);
    },
    changeView({ state, commit }, component) {
      if (componentOrder[component] !== undefined) {
        const transition = getTransitionBetween(state.appConfig.activeComponent, component);
        commit('setActiveComponent', { component, transition });
      }
    },
    saveGamePreference({ commit }, { key, value }) {
      commit('configureGame', { key, value });
    },
    startGame({ state, commit, dispatch }) {
      commit('saveWordsForGame');
      const { teams, turnsPerTeam } = state.gameConfig;
      commit('registerTurns', { teams, turnsPerTeam });
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
  },
});
