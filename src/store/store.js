import Vue from 'vue';
import Vuex from 'vuex';
import defaults from '../data/defaults';
import animationSequence from '../data/animation-sequence';
import gameCategories from '../data/game-categories';
import gameDifficulties from '../data/game-difficulties';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const {
  activeComponent,
  transition,
  backgroundColour,
  category,
  difficulty,
  teams,
  turnsPerTeam,
  turnDuration,
} = defaults;

const appConfig = {
  activeComponent,
  transition,
  backgroundColour,
};

const gameConfig = {
  category,
  difficulty,
  teams,
  turnsPerTeam,
  turnDuration,
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
    activeTurn: state => state.gameTurns.find(turn => !turn.completed),
    actingWord: state => state.actingWord,
  },
  mutations,
  actions,
});
