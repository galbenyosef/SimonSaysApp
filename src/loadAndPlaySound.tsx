import Sound from 'react-native-sound';

export const loadAndPlaySound = (name: string) => {
  const sound = new Sound(name, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log(error);
      console.log('failed to load the sound');
      return;
    }
    // when loaded successfully
    sound.play(() => sound.release());
  });
};
