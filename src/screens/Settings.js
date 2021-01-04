import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {RenderList, ScreenTitle, AnimatedScrollView} from '../components';
import {colors} from '../constants';
import useMovies from '../hooks/useMovies';
import {
  showNotification,
  showScheduledNotification,
  handleCancelNotifications,
  getChannelId,
} from '../Notifications';

const Settings = () => {
  const {watchedMovies} = useMovies('');
  const momentDate = moment().add(5, 'seconds').toDate();

  return (
    <AnimatedScrollView>
      <ScreenTitle screenTitle="Watched List" />
      {/* <RenderList data={watchedMovies} listTitle="Already Watched" /> */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.notifyBtn}
          onPress={() => {
            console.log('Showing Notifications');
            showNotification('WatchList', "It's Time to watch Game of Thrones");
          }}>
          <View>
            <Text style={{color: '#fff'}}>Normal Notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            showScheduledNotification(
              'WatchList',
              "It's Time to watch Game of Thrones",
              momentDate,
            )
          }
          style={styles.notifyBtn}>
          <View>
            <Text style={{color: '#fff'}}>Schedule Notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancelNotifications}
          style={styles.notifyBtn}>
          <View>
            <Text style={{color: '#fff'}}>Cancel All Notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifyBtn} onPress={getChannelId}>
          <View>
            <Text style={{color: '#fff'}}>Get Channel Id</Text>
          </View>
        </TouchableOpacity>
      </View>
    </AnimatedScrollView>
  );
};

export default Settings;

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
