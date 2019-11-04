import Vue from 'vue';
import Vuex from 'vuex';
import STATES from './data/app/states';
import SCREENS from './data/app/screens';
import ANIMATION_SEQUENCE from './data/app/animation-sequence';
import CATEGORIES from './data/game/categories';
import DIFFICULTIES from './data/game/difficulties';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appState: STATES.IDLE,
    viewConfig: {
      visibleScreen: SCREENS.HOME,
      backgroundColor: null,
      transitionDirection: null,
    },
    gameConfig: {
      difficulty: DIFFICULTIES.EASY,
      category: null,
      teams: 2,
      turnsPerTeam: 2,
    },
    gameTurns: [],
  },
  getters: {
    states: () => STATES,
    screens: () => SCREENS,
    categories: () => CATEGORIES,
    difficulties: () => DIFFICULTIES,
    animationSequence: () => ANIMATION_SEQUENCE,
    appState: state => state.appState,
    visibleScreen: state => state.viewConfig.visibleScreen,
    backgroundColor: state => state.viewConfig.backgroundColor,
    transitionDirection: state => state.viewConfig.transitionDirection,
    gameConfig: state => state.gameConfig,
  },
  mutations: {
    setAppState(state, appState) {
      state.appState = appState;
    },
    setBackgroundColor(state, backgroundColor) {
      state.viewConfig.backgroundColor = backgroundColor;
    },
    setVisibleScreen(state, { screen, transitionDirection }) {
      state.viewConfig.transitionDirection = transitionDirection;
      state.viewConfig.visibleScreen = screen;
    },
    setGameConfig(state, payload) {
      Object.keys(payload).forEach((property) => {
        state.gameConfig[property] = payload[property];
      });
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
    goToScreen({ state, commit }, screenName) {
      const destinationScreen = this.screens[screenName];
      if (destinationScreen) {
        const isNextScreen = destinationScreen.level > state.visibleScreen.level;
        const transitionDirection = isNextScreen ? 'moveleft' : 'moveright';
        commit('setVisibleScreen', {
          screen: destinationScreen,
          transitionDirection,
        });
      }
    },
    changeBackgroundColor({ commit }, payload) {
      commit('setBackgroundColor', payload);
    },
    setGameConfig({ commit }, payload) {
      commit('setGameConfig', payload);
    },
    startGame({ state, commit }) {
      const { teams, turnsPerTeam } = state.gameConfig;
      commit('registerTurns', { teams, turnsPerTeam });
      commit('setAppState', STATES.GAME_IN_PROGRESS);
    },
  },
});
