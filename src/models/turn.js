export default function (team, count, duration) {
  this.team = team;
  this.count = count;
  this.started = false;
  this.active = false;
  this.completed = false;
  this.timeLeft = duration;
  this.correctGuesses = [];
  this.usedWords = [];
  this.ready = () => {
    this.active = true;
  };
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
    if (!this.correctGuesses.includes(word)) {
      this.correctGuesses.push(word);
      this.saveUsedWord(word);
    }
  };
  this.removeCorrectGuess = (wordToRemove) => {
    this.correctGuesses = this.correctGuesses.filter(word => word !== wordToRemove);
  };
  this.saveUsedWord = (word) => {
    if (!this.usedWords.includes(word)) {
      this.usedWords.push(word);
    }
  };
  this.end = () => {
    this.active = false;
  };
}
