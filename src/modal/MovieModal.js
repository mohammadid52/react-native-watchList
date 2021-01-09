import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import Modal from 'react-native-modal';

import {BackButton} from '../components';
import {colors} from '../constants';
import {
  handleCancelNotifications,
  showScheduledNotification,
} from '../Notifications';
import {reminderAction, deleteMovie} from '../helpers';
import {has} from 'lodash';

const {height} = Dimensions.get('screen');
const modalHeight = height / 1.8;

const MovieModal = ({isModalVisible, setModalIsVisible, data}) => {
  const {toWatchAt, watchTime, isReminderOn, movieId, isWatched, title} = data;
  const hideModal = () => setModalIsVisible(false);

  const handleDelete = (movieId) => {
    deleteMovie(movieId).then(() => {
      Vibration.vibrate(100);
      hideModal();
    });
  };
  const isWebSeries = has(data, 'webSeries');

  return (
    <ContentView
      isVisible={isModalVisible}
      backdropOpacity={0.7}
      swipeDirection="down"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={hideModal}
      onSwipeComplete={hideModal}
      onBackdropPress={hideModal}>
      <Content>
        {/* <BackButton goBack={hideModal} />   ========For Testing========  */}
        <Container>
          <MovieNameText>{title}</MovieNameText>
          {isWebSeries && (
            <View
              style={{
                backgroundColor: colors.textColor,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
                marginBottom: 10,
              }}>
              <OtherText>
                season {data.webSeries.seasonNum} episode{' '}
                {data.webSeries.episodeNum}
              </OtherText>
            </View>
          )}
          <TextContainer>
            <WatchAtText>Time : {moment(toWatchAt).format('lll')}</WatchAtText>
          </TextContainer>

          <Watched isWatched={isWatched}>
            <WatchedText isWatched={isWatched}>
              {isWatched ? 'Watched' : 'Not Watched'}
            </WatchedText>
          </Watched>

          {!isWatched && (
            <Reminder>
              <ReminderText>Set Reminder : </ReminderText>
              <Switch
                trackColor={{false: colors.lightRed, true: colors.lightBlue2}}
                thumbColor={isReminderOn ? colors.darkBlue : colors.red}
                onValueChange={() => reminderAction(movieId, isReminderOn)}
                value={isReminderOn}
              />
            </Reminder>
          )}

          <Delete onPress={() => handleDelete(movieId)}>
            <DeleteText>Delete</DeleteText>
          </Delete>
        </Container>
      </Content>
    </ContentView>
  );
};

export default MovieModal;

const ContentView = styled(Modal)`
  /* height: 100; */
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  background-color: #fff;
  padding: 22px;
  border-radius: 17px;
  /* height: ${modalHeight}; For Testing */
  min-width: 250px;
`;

const Container = styled.View`
  /* margin-top: 40; For Testing */
  justify-content: center;
  align-items: center;
`;

const MovieNameText = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-family: 'Poppins-BoldItalic';
  color: #000;
  border-bottom-width: 4px;
  border-bottom-color: ${colors.green};
`;
const OtherText = styled.Text`
  font-family: 'Poppins-SemiBold';
  text-align: center;
  color: ${colors.white1};
  font-size: 13px;
`;

const TextContainer = styled.Text`
  margin-top: 4px;
  margin-bottom: 4px;
`;

const WatchAtText = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 18px;
  color: #000;
`;

const Watched = styled.View`
  padding: 4px 8px;
  border-radius: 6px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: ${(props) =>
    props.isWatched ? colors.lightRed : colors.lightBlue2};
`;

const WatchedText = styled.Text`
  color: ${(props) => (props.isWatched ? colors.darkRed : colors.darkBlue)};
  font-family: 'Poppins-SemiBold';
`;

const Delete = styled.TouchableOpacity`
  border-radius: 6px;
  margin-top: 6px;
  /* margin-bottom: 12; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DeleteText = styled.Text`
  font-family: 'Poppins-SemiBold';
  color: ${colors.red};
`;

const ReminderText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #000;
`;

const Reminder = styled.View`
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
