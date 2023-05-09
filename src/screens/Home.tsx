import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import {Quarter} from '../components/Quarter';
import {StartButton} from '../components/StartButton';
import {HighlightsList} from '../components/Highlights/HighlightsList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList, Statuses} from '../types';
import {Quarters} from '../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {
  setPlayTriggers,
  setStatus,
  setTypedSequence,
  onWin,
  onGameover,
} from '../redux/appSlice';
import {RootState} from '../redux/store';
import BG from '../assets/bg.jpg';

Sound.setCategory('Playback');

export const HomeScreen = () => {
  const {currentSequence, playTriggers, typedSequence, status} = useSelector(
    (state: RootState) => state.app,
  );

  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const currentLevel = currentSequence.length;

  const onLose = () => {
    dispatch(onGameover());
    navigation.navigate('NewHighlight', {level: currentLevel});
  };

  const onButtonPress = (buttonIndex: number) => {
    if (status === Statuses.Listening) {
      const nextSequence = [...typedSequence, buttonIndex];
      //type ok
      if ((currentSequence + '').startsWith(nextSequence + '')) {
        //last press
        if (currentLevel === nextSequence.length) {
          dispatch(onWin());
        } //press
        else {
          dispatch(setTypedSequence(nextSequence));
        }
      }
      //type wrong
      else {
        onLose();
      }
    }
  };

  const onTriggerButton = (buttonIndex: number) =>
    new Promise<void>(res => {
      setTimeout(() => {
        const newTriggers = [...playTriggers];
        newTriggers[buttonIndex] = Math.random();
        dispatch(setPlayTriggers(newTriggers));
        res();
      }, 800);
    });

  const playSequence = async () => {
    dispatch(setStatus(Statuses.Playback));

    for (let i = 0; i < currentSequence.length + 1; i++) {
      await onTriggerButton(currentSequence[i]);
    }

    dispatch(setPlayTriggers(new Array(4).fill(0)));
    dispatch(setStatus(Statuses.Listening));
  };

  const onStart = () => {
    playSequence();
  };

  const statusToString = {
    [Statuses.Idle]: 'Idle',
    [Statuses.Listening]: 'Listening',
    [Statuses.Playback]: 'Playback',
  };

  const statusToTitleString = {
    [Statuses.Idle]: 'Press to start',
    [Statuses.Listening]: 'Waiting for user press',
    [Statuses.Playback]: 'Listen carefully!',
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={BG as ImageSourcePropType}
      style={styles.container}>
      {/*       {__DEV__ ? (
        <View style={styles.debug}>
          <Text>Status: {statusToString[status]}</Text>
          <Text>Level: {currentLevel}</Text>
          <Text>Sequence: {JSON.stringify(currentSequence)}</Text>
          <Text>Sequence Typed: {JSON.stringify(typedSequence)}</Text>
        </View>
      ) : null} */}
      <View style={styles.topView}>
        <Text style={styles.topViewText}>Level: {currentLevel}</Text>
        <Text style={styles.topViewText}>{statusToTitleString[status]}</Text>
      </View>

      <View style={styles.gameContainer}>
        <View
          style={[
            {
              transform: [{rotateX: '45deg'}, {scale: 0.95}],
            },
            styles.quarterContainer,
          ]}>
          {Quarters.map((quarter, index) => (
            <Quarter
              disabled={status === Statuses.Playback}
              onButtonPress={onButtonPress}
              playTrigger={playTriggers[index]}
              key={index}
              backgroundColor={quarter.color}
              index={index}
              soundName={quarter.soundName}
            />
          ))}

          <StartButton currentLevel={currentLevel} onPress={onStart} />
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Highlights')}
        style={styles.highlightContainer}>
        <HighlightsList amount={5} />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debug: {
    flex: 1,
    top: 80,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  topView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  topViewText: {color: 'white', fontWeight: 'bold', fontSize: 24},
  gameContainer: {width: '100%', aspectRatio: 1},
  quarterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  highlightContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
