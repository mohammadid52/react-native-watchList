import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, LogBox} from 'react-native';
import moment from 'moment';

import {BottomNavigator} from './src/navigations';
import {colors} from './src/constants';
import TabBarProvider from './src/context/TabBarProvider';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <TabBarProvider>
        <StatusBar backgroundColor={colors.sharpRed} />
        <BottomNavigator />
      </TabBarProvider>
    </NavigationContainer>
  );
};

export default App;
