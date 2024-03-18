import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Home from './src/views/home';

export default function Main() {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);