import React from 'react';
import {ActivityIndicator, Dimensions, Vibration} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import moment from 'moment';

import {colors} from '../constants';
import {addMovie, getDate} from '../helpers';
import useSettings from '../hooks/useSettings';

const {height: screenHeight} = Dimensions.get('screen');

const AddNextModal = ({
  visible = false,
  title,
  hideModal = () => {},
  data = {},
  watchAction = () => {},
}) => {
  const {settings, loading} = useSettings();

  if (loading) {
    return <ActivityIndicator />;
  }

  const {defaultDate} = settings[0];

  const webSeries = {
    createdAt: moment().format('lll'),
    title,
    userId: 'j4fA81iLv6Czjs1Jh9fo',
    toWatchAt: getDate(defaultDate).toWatchAt,
    watchTime: getDate(defaultDate).watchTime,
    isWatched: false,
    webSeries: {
      seasonNum: data.seasonNum,
      episodeNum: data.episodeNum + 1,
    },
  };

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.7}
      swipeDirection="down"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      onSwipeCancel={hideModal}>
      <ContentView>
        <Content>
          <NormalText>{title}</NormalText>
          <Confirm
            onPress={() => {
              addMovie(webSeries).then(() => {
                Vibration.vibrate(100);
                hideModal();
                watchAction();
              });
            }}>
            <ConfirmText>
              Add Season {data.seasonNum} Episode {data.episodeNum + 1}
            </ConfirmText>
          </Confirm>
          <Confirm
            onPress={() => {
              watchAction();
              hideModal();
            }}
            style={{backgroundColor: '#fff'}}>
            <ConfirmText
              style={{color: colors.red, fontFamily: 'Poppins-SemiBold'}}>
              I Don't Want To Add
            </ConfirmText>
          </Confirm>
        </Content>
      </ContentView>
    </Modal>
  );
};

export default AddNextModal;

const NormalText = styled.Text`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const Content = styled.View`
  background-color: #fff;
  /* height: 170; */
  min-width: 250px;
  border-radius: 12px;
  padding: 12px;
`;

const ContentView = styled.View`
  justify-content: center;
  align-items: center;
`;

const Confirm = styled.TouchableOpacity`
  height: 30px;
  background-color: ${colors.lightBlue2};
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 6px;
`;
const ConfirmText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${colors.darkBlue};
  font-size: 16px;
  text-align: center;
  line-height: 30px;
`;
