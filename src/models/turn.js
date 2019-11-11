export default function (team, count, duration) {
  this.team = team;
  this.count = count;
  this.started = false;
  this.completed = false;
  this.timeLeft = duration;
  this.correctGuesses = [];
  this.words = [];
  this.countdownTurn = () => new Promise((resolve) => {
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
    this.saveWord(word);
  };
  this.saveWord = (word) => {
    this.words.push(word);
  };
}
