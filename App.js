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

// theme
import {readThemePreference} from './src/storage';
import {darkTheme, lightTheme} from './src/constants/colors';
import {isEmpty} from 'lodash';

LogBox.ignoreAllLogs();
const App = () => {
  const [theme, setTheme] = useState({});

  useEffect(() => {
    const unsub = async () => {
      await readThemePreference().then((theme) => {
        if (theme === 'dark') {
          setTheme(darkTheme);
        } else {
          setTheme(lightTheme);
        }
        return setTheme(darkTheme);
      });
    };
    return () => unsub();
  }, [theme]);

  const renderTheme = isEmpty(theme) ? darkTheme : theme;
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
