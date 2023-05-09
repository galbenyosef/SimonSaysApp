import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Sound from 'react-native-sound';
import {StackNavigator} from './src/navigation/StackNavigator';

Sound.setCategory('Playback');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
