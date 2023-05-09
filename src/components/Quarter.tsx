import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  ColorValue,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {loadAndPlaySound} from '../loadAndPlaySound';

type Props = {
  index: number;
  soundName?: string;
  backgroundColor: ColorValue;
  playTrigger?: number;
  onButtonPress?: (buttonIndex: number) => void;
  disabled: boolean;
};

const getBorderByIndex = (index: number): ViewStyle => ({
  borderTopLeftRadius: index === 0 ? 1000 : 0,
  borderTopRightRadius: index === 1 ? 1000 : 0,
  borderBottomLeftRadius: index === 2 ? 1000 : 0,
  borderBottomRightRadius: index === 3 ? 1000 : 0,
});

export const Quarter = ({
  index,
  soundName,
  backgroundColor,
  playTrigger,
  onButtonPress,
  disabled,
}: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.6)).current;

  const onPress = () => {
    play();
    onButtonPress?.(index);
  };

  const play = useCallback(() => {
    if (soundName) {
      loadAndPlaySound(soundName);
    }

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, scaleAnim, soundName]);

  useEffect(() => {
    if (playTrigger) {
      play();
    }
  }, [play, playTrigger]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{scale: scaleAnim}],
          backgroundColor,
        },
        styles.quarter,
        {
          ...getBorderByIndex(index),
        },
      ]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={styles.pressableArea}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quarter: {
    width: '50%',
    height: '50%',
  },
  pressableArea: {
    flex: 1,
  },
});
