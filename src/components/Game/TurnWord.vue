<template>
  <div class="turn-word" :class="classObject">
    <span class="turn-word__letters">{{ displayedWord }}</span>
    <span v-if="showStrikethrough" :class="strikethroughClass"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TurnWord',
  props: {
    placeholder: String,
    strikeLeft: Boolean,
    strikeRight: Boolean,
  },
  data() {
    return {
      isAnimating: false,
      cachedActingWord: this.actingWord,
    };
  },
  computed: {
    ...mapGetters([
      'activeTurn',
      'actingWord',
    ]),
    isActive() {
      return this.activeTurn.started;
    },
    lastGuessWasCorrect() {
      const { correctGuesses } = this.activeTurn;
      return correctGuesses.includes(this.cachedActingWord);
    },
    showStrikethrough() {
      return this.isAnimating && !this.lastGuessWasCorrect;
    },
    strikethroughClass() {
      return `strike strike--${this.strikeRight ? 'right' : 'left'}`;
    },
    displayedWord() {
      return this.isActive ? this.cachedActingWord : this.placeholder;
    },
    classObject() {
      return {
        active: this.isActive,
        'fade-out': this.isAnimating && !this.lastGuessWasCorrect,
        'fade-out-down': this.isAnimating && this.lastGuessWasCorrect,
      };
    },
  },
  methods: {
    animateOut(value) {
      this.isAnimating = value;
      this.$emit(value ? 'isAnimating' : 'notisAnimating');
    },
  },
  created() {
    this.$watch('actingWord', () => {
      this.animateOut(true);
      setTimeout(() => {
        this.cachedActingWord = this.actingWord;
        this.animateOut(false);
      }, 300);
    });
  },
};
</script>

<style scoped lang="scss">
@import '../../scss/colours';
@import '../../scss/textstyles';
@import '../../scss/keyframes';

@include keyframes('fade-in');
@include keyframes('fade-out');
@include keyframes('fade-out-down');
@include keyframes('grow-vertically');

.turn-word {
  position: relative;
  text-transform: uppercase;
  transition: opacity;
  animation: fade-in 300ms;
  text-align: center;
  &.fade-out {
    animation: fade-out 300ms;
  }
  &.fade-out-down {
    animation: fade-out-down 300ms;
  }
  &__letters {
    @include header(2);
    color: $offwhite;
    line-height: .8;
    .active & {
      color: $yellow;
    }
  }
}

.strike {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 5px;
  transform: scale(1.1);
  background: white;
  animation: grow-vertically 300ms;
  &--left {
    right: 0;
  }
  &--right {
    left: 0;
  }
}
</style>
