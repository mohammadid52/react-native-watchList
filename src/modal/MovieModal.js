import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Switch} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';

import {BackButton} from '../components';
import {colors} from '../constants';
import {
  handleCancelNotifications,
  showScheduledNotification,
} from '../Notifications';
import {reminderAction} from '../helpers';

const {height} = Dimensions.get('screen');
const modalHeight = height / 1.8;

const MovieModal = ({isModalVisible, setModalIsVisible, data}) => {
  const {toWatchAt, watchTime, isReminderOn, movieId, isWatched, title} = data;

  const hideModal = () => setModalIsVisible(false);

  return (
    <Modal
      animationIn="slideInUp"
      animationInTiming={600}
      animationOut="slideOutDown"
      animationOutTiming={800}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      backdropColor="#000"
      backdropOpacity={0.78}
      isVisible={isModalVisible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      style={styles.contentView}>
      <View style={styles.content}>
        <BackButton goBack={hideModal} />
        <View style={styles.mainContent}>
          <Text
            style={[
              styles.movieName,
              {borderBottomWidth: 4, borderBottomColor: colors.green},
            ]}>
            {title}
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.watchAt}>Watch At: {data.toWatchAt}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.time}>Time: {data.watchTime}</Text>
          </View>

          <View
            style={[
              styles.watched,
              {
                backgroundColor: data.isWatched
                  ? colors.lightRed
                  : colors.lightBlue2,
              },
            ]}>
            <Text
              style={{
                color: isWatched ? colors.darkRed : colors.darkBlue,
                fontFamily: 'Poppins-MediumItalic',
              }}>
              {data.isWatched ? 'Watched' : 'Not Watched'}
            </Text>
          </View>

          {!isWatched && (
            <View style={styles.reminder}>
              <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                Set Reminder :{' '}
              </Text>
              <Switch
                trackColor={{false: colors.lightRed, true: colors.lightBlue2}}
                thumbColor={isReminderOn ? colors.darkBlue : colors.red}
                onValueChange={() => reminderAction(movieId, isReminderOn)}
                value={isReminderOn}
              />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.addedOn}>
              Added On: {moment(data.createdAt, 'lll').format('ll')}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MovieModal;

const styles = StyleSheet.create({
  reminder: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 17,
    height: modalHeight,
  },
  mainContent: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  movieName: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-BoldItalic',
    color: '#000',
  },
  addedOn: {
    fontFamily: 'Poppins-Light',
    color: colors.gray,
  },
  watchAt: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 18,
  },
  time: {
    fontFamily: 'Poppins-LightItalic',
    fontSize: 18,
    color: '#000',
  },
  textContainer: {
    marginVertical: 4,
  },
  watched: {
    backgroundColor: colors.lightBlue2,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginVertical: 12,
  },
});
