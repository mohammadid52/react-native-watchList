import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, Vibration} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import moment from 'moment';

import {colors} from '../constants';
import {addMovie, getDate} from '../helpers';
import {readDefaultDate} from '../storage';

const {height: screenHeight} = Dimensions.get('screen');

const AddNextModal = ({
  visible = false,
  title,
  hideModal = () => {},
  data = {},
  watchAction = () => {},
  uid,
}) => {
  const [defaultDate, setDefaultDate] = useState();

  useEffect(() => {
    const unsub = async () => {
      try {
        const date = await storage.readDefaultDate();
        setDefaultDate(date);
      } catch (error) {
        console.error('error @useEffect in AutoAddNextModal: ', error);
      }
    };
    return () => unsub();
  }, [defaultDate]);

  const webSeries = {
    createdAt: moment().format('lll'),
    title,
    userId: uid,
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
            cancel
            onPress={() => {
              watchAction();
              hideModal();
            }}>
            <ConfirmText cancel>I Don't Want To Add</ConfirmText>
          </Confirm>
        </Content>
      </ContentView>
    </Modal>
  );
};

export default AddNextModal;

const NormalText = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  text-align: center;
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const Content = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BG_CARD};
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
  background-color: ${(props) =>
    props.cancel ? 'transparent' : props.theme.SECONDARY_BLUE};
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 6px;
`;
const ConfirmText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${(props) =>
    props.cancel ? props.theme.PRIMARY_RED : props.theme.PRIMARY_BLUE};
  font-size: 16px;
  text-align: center;
  line-height: 30px;
`;
