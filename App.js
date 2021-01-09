import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, LogBox} from 'react-native';
import moment from 'moment';

import {AppStackNavigator} from './src/stacks/AppStack';
import {colors} from './src/constants';
import {auth} from './src/firebase';
import TabBarProvider from './src/context/TabBarProvider';
import UserContext from './src/context/UserContext';

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <TabBarProvider>
          <StatusBar backgroundColor={colors.sharpRed} />
          <AppStackNavigator />
        </TabBarProvider>
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
