import componentOrder from '../data/component-order';

export default function (previous, next) {
  const previousIndex = componentOrder[previous];
  const nextIndex = componentOrder[next];
  return nextIndex > previousIndex ? 'moveleft' : 'moveright';
}
