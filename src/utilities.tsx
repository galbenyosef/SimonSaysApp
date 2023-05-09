export const Quarters = [
  {
    color: 'limegreen',
    soundName: 'sounds_1.mp3',
  },
  {
    color: 'crimson',
    soundName: 'sounds_2.mp3',
  },
  {
    color: 'gold',
    soundName: 'sounds_3.mp3',
  },
  {
    color: 'dodgerblue',
    soundName: 'sounds_4.mp3',
  },
];

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
