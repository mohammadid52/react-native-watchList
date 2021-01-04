import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import moment from 'moment';

import {BottomNavigator} from './src/navigations';
import TabBarProvider from './src/context/TabBarProvider';
import SeletedtTimeProvider from './src/context/SelectedTime';
import MoviesProvider from './src/context/MoviesContext';
import {colors} from './src/constants';
import useReminders from './src/hooks/useReminders';
import {showScheduledNotification} from './src/Notifications';

const App = () => {
  // const {reminderOnMovies} = useReminders();

  // useEffect(() => {
  //   const unsubsribe = reminderOnMovies.forEach((movie) => {
  //     showScheduledNotification(
  //       'My Watch List',
  //       `It't time to watch ${movie.title}`,
  //       moment(movie.toWatchAt, 'lll').toDate(),
  //     );
  //   });
  //   return () => unsubsribe;
  // }, []);

  return (
    <NavigationContainer>
      <MoviesProvider>
        <SeletedtTimeProvider>
          <TabBarProvider>
            <StatusBar backgroundColor={colors.green} />
            <BottomNavigator />
          </TabBarProvider>
        </SeletedtTimeProvider>
      </MoviesProvider>
    </NavigationContainer>
  );
};

export default App;
