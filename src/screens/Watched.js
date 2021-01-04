import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';

import {
  RenderList,
  ScreenTitle,
  AnimatedScrollView,
  Empty,
} from '../components';
import {colors} from '../constants';
import useMovies from '../hooks/useMovies';
import {
  showNotification,
  showScheduledNotification,
  handleCancelNotifications,
  getChannelId,
} from '../Notifications';

const Watched = () => {
  const {loading, watchedMovies} = useMovies('');

  if (loading) {
    return <ActivityIndicator size="large" color={colors.darkBlue} />;
  }

  return (
    <AnimatedScrollView>
      <ScreenTitle screenTitle="Watched List" />
      {watchedMovies.length > 0 ? (
        <RenderList data={watchedMovies} listTitle="Already Watched" />
      ) : (
        <Empty
          home={false}
          text="You Have Not Watched Any Movies Yet"
          subText="Click On Checkbox To Add Movie Here"
        />
      )}
    </AnimatedScrollView>
  );
};

export default Watched;

const styles = StyleSheet.create({
  container: {
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyBtn: {
    backgroundColor: colors.darkRed,
    marginVertical: 20,
    padding: 12,
    borderRadius: 6,
  },
});
