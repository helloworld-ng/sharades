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

export default new Vuex.Store({
  state: {
    appState,
    homeConfig,
    gameConfig,
    gameTurns: [],
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
      for (let turn = 1; turn <= turnsPerTeam; turn += 1) {
        for (let team = 1; team <= teams; team += 1) {
          state.gameData.push({
            turn,
            team,
            isPlayed: false,
            isActive: false,
          });
        }
      }
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
    },
    startGame({ state, commit }) {
      const { teams, turnsPerTeam } = state.gameConfig;
      commit('registerTurns', { teams, turnsPerTeam });
      commit('setAppState', 'gameInProgress');
    },
  },
});
