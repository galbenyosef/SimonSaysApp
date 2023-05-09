import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import Sound from 'react-native-sound';
import App from '../../App';
import {Highlights} from '../screens/Highlights';
import {HomeScreen} from '../screens/Home';
import {NewHighlight} from '../screens/NewHighlight';

Sound.setCategory('Playback');

const Stack = createStackNavigator();

const transparentOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({
    current: {progress},
  }: StackCardInterpolationProps) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={transparentOptions}
        name="NewHighlight"
        component={NewHighlight}
      />
      <Stack.Screen
        options={transparentOptions}
        name="Highlights"
        component={Highlights}
      />
    </Stack.Navigator>
  );
};

export default App;
