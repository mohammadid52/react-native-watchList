import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, LogBox} from 'react-native';
import moment from 'moment';
import {ThemeProvider} from 'styled-components';

//navigations
import {AppStackNavigator} from './src/stacks/AppStack';

import {colors} from './src/constants';
import {auth} from './src/firebase';

// context
import TabBarProvider from './src/context/TabBarProvider';
import UserContext from './src/context/UserContext';

// other
import {isEmpty} from 'lodash';
import useSettings from './src/hooks/useSettings';
import {darkTheme, lightTheme} from './src/constants/colors';

LogBox.ignoreAllLogs();
const App = () => {
  const uid = auth().currentUser.uid || '';
  const {settings, defaultSetting} = useSettings(uid);

  const {theme} = !settings.length ? defaultSetting : settings[0];
  const renderTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={renderTheme}>
      <UserContext>
        <NavigationContainer>
          <TabBarProvider>
            <StatusBar backgroundColor={colors.sharpRed} />
            <AppStackNavigator />
          </TabBarProvider>
        </NavigationContainer>
      </UserContext>
    </ThemeProvider>
  );
};

export default App;
