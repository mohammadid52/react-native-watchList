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
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BG_CARD};
  padding: 22px;
  border-radius: 17px;
  min-width: 250px;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const MovieNameText = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-family: 'Poppins-BoldItalic';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  border-bottom-width: 4px;
  border-bottom-color: ${(props) => props.theme.SECONDARY_GREEN};
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
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const Watched = styled.View`
  padding: 0px 8px;
  border-radius: 6px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: ${(props) =>
    props.isWatched ? props.theme.SECONDARY_RED : props.theme.SECONDARY_BLUE};
`;

const WatchedText = styled.Text`
  color: ${(props) =>
    props.isWatched ? props.theme.PRIMARY_RED : props.theme.PRIMARY_BLUE};
  font-family: 'Poppins-SemiBold';
`;

const Delete = styled.TouchableOpacity`
  border-radius: 6px;
  margin-top: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DeleteText = styled.Text`
  font-family: 'Poppins-SemiBold';
  letter-spacing: 0.8;
  color: ${(props) => props.theme.PRIMARY_RED};
`;

const ReminderText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const Reminder = styled.View`
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
