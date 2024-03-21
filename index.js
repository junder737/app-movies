import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Home from './src/views/home';
import { NavigationContainer } from '@react-navigation/native';
export default function Main() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <Home />
    </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);