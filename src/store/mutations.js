import Turn from '../models/turn';

export default {
  setBackgroundColour(state, colour) {
    state.appConfig.backgroundColour = colour;
  },
  setActiveComponent(state, { transition, component }) {
    state.appConfig.transition = transition;
    state.appConfig.activeComponent = component;
  },
  configureGame(state, { key, value }) {
    state.gameConfig[key] = value;
  },
  registerTurns(state, { teams, turnsPerTeam, turnDuration }) {
    for (let count = 1; count <= turnsPerTeam; count += 1) {
      for (let team = 1; team <= teams; team += 1) {
        state.gameTurns.push(new Turn(team, count, turnDuration));
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
};
