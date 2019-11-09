import samples from '../data/samples';

export default function ({ category = 'nollywood', difficulty = 'hard' }) {
  return samples[category][difficulty];
}
