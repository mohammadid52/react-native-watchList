import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, LogBox} from 'react-native';
import moment from 'moment';

import {AppStack} from './src/navigations';
import {colors} from './src/constants';
import {auth} from './src/firebase';
import TabBarProvider from './src/context/TabBarProvider';
import UserContext from './src/context/UserContext';

LogBox.ignoreAllLogs();
const App = () => {
  const [user, setUser] = useState(null);

  // Adding user to context
  function onAuthStateChanged(_user) {
    if (_user) {
      return setUser(_user);
    } else {
      return setUser(false);
    }
  }

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <UserContext data={user}>
      <NavigationContainer>
        <TabBarProvider>
          <StatusBar backgroundColor={colors.sharpRed} />
          <AppStack user={user} />
        </TabBarProvider>
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
