import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DataProvider} from './src/context/DataProvider';
import {Navigator} from './src/navigation/Navigator';
import './shim'

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
