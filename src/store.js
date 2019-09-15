import Vue from 'vue';
import Vuex from 'vuex';
import categories from './data/categories';

Vue.use(Vuex);

const GAME_STATES = {
  IDLE: 0,
  CHOOSE_CATEGORY: 1,
  CHOOSE_OPTIONS: 2,
  IN_PROGRESS: 3,
  PAUSED: 4,
  ENDED: 5,
};

const GAME_MODES = {
  EASY: 0,
  HARD: 1,
};

const GAME_CATEGORIES = categories;

export default new Vuex.Store({
  state: {
    gameState: GAME_STATES.IDLE,
    currentTurn: null,
    config: {
      mode: GAME_MODES.EASY,
      category: null,
      teamCount: 2,
      turnsPerTeam: 2,
    },
    data: {
      teams: {},
      turns: {},
    },
  },
  getters: {
    allCategories: () => GAME_CATEGORIES,
    allStates: () => GAME_STATES,
    currentState: state => state.gameState,
    currentTurn: (state) => {
      if (!state.currentTurn) return null;
      return state.data.turns[state.currentTurn];
    },
  },
  mutations: {
    setGameState(state, gameState) {
      state.gameState = gameState;
    },
    setConfig(state, payload) {
      Object.keys(payload).forEach((property) => {
        if (state.config[property]) {
          state.config[property] = payload[property];
        }
      });
    },
    registerTeam(state) {
      const id = Object.keys(state.data.teams).length + 1;
      state.data.teams[id] = { id };
    },
    registerTurn(state, team) {
      const id = Object.keys(state.data.turns).length + 1;
      state.data.turns[id] = {
        id,
        team,
        isPlayed: false,
        isActive: false,
      };
    },
    startTurn(state, id) {
      const turn = state.data.turns[id];
      if (turn) {
        turn.isActive = true;
        state.currentTurn = turn.id;
      }
    },
    endTurn(state, id) {
      const turn = state.data.turns[id];
      if (turn) {
        turn.isActive = false;
        state.currentTurn = null;
      }
    },
    resetGameData(state) {
      state.data = {
        teams: [],
        turns: [],
      };
    },
  },
  actions: {
    async registerTeams({ commit }, teamCount) {
      for (let i = 1; i <= teamCount; i += 1) {
        commit('registerTeam');
      }
    },
    async registerTurns({ commit, state }, turnsPerTeam) {
      for (let i = 0; i < turnsPerTeam; i += 1) {
        Object.keys(state.data.teams).forEach(id => commit('registerTurn', id));
      }
    },
    async startGame({ dispatch, state, commit }) {
      const { teamCount, turnsPerTeam } = state.config;
      await dispatch('registerTeams', teamCount);
      await dispatch('registerTurns', turnsPerTeam);
      commit('setGameState', GAME_STATES.IN_PROGRESS);
      commit('startTurn', 1);
    },
    nextTurn({ state, commit }) {
      const { currentTurn } = state;
      commit('endTurn', currentTurn);
      commit('startTurn', currentTurn + 1);
    },
    resetGame({ commit }) {
      commit('resetGameData');
      commit('setConfig', {
        mode: null,
        category: null,
      });
      commit('setGameState', GAME_STATES.IDLE);
    },
  },
});
