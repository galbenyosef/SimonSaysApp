import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type StartButtonType = {
  currentLevel: number;
  onPress: () => void;
};

export const StartButton = ({currentLevel, onPress}: StartButtonType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnContent}>{`Start Lv. ${currentLevel}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 70,
    height: 70,
    elevation: 1,
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnContent: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
