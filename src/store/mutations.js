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
  populateWordBank(state, words) {
    state.wordBank = words;
  },
  setActingWord(state, actingWord) {
    state.actingWord = actingWord;
  },
  saveUsedWordToTurn(state, { turn, word }) {
    turn.saveUsedWord(word);
  },
  saveCorrectGuessToTurn(state, { turn, word }) {
    turn.saveCorrectGuess(word);
  },
  removeCorrectGuess(state, { turn, word }) {
    turn.removeCorrectGuess(word);
  },
  addToUsedPile(state, word) {
    if (!state.usedPile.includes(word)) {
      state.usedPile.push(word);
    }
  },
  addToDiscardPile(state, wordToRemove) {
    if (!state.discardPile.includes(wordToRemove)) {
      state.discardPile.push(wordToRemove);
      state.wordBank = state.wordBank.filter(word => word !== wordToRemove);
    }
  },
  removeFromDiscardPile(state, wordToRemove) {
    state.discardPile = state.discardPile.filter(word => word !== wordToRemove);
  },
};
