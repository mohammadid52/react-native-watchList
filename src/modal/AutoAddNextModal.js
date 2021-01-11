import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import styled from 'styled-components';

import {addMovie, getDate} from '../helpers';
import {readDefaultDate} from '../storage';

const AutoAddNextModal = ({
  isModalVisible = false,
  hideModal = () => {},
  data = {},
  uid,
}) => {
  const [defaultDate, setDefaultDate] = useState();

  useEffect(() => {
    const unsub = async () => {
      try {
        const date = await readDefaultDate();
        setDefaultDate(date);
      } catch (error) {
        console.error('error @useEffect in AutoAddNextModal: ', error);
      }
    };
    return () => unsub();
  }, [defaultDate]);

  const {seasonNum, episodeNum} = data.webSeries;

  const webSeries = {
    createdAt: moment().format('lll'),
    title: data.title,
    userId: uid,
    toWatchAt: getDate(defaultDate).toWatchAt,
    watchTime: getDate(defaultDate).watchTime,
    isWatched: false,
    webSeries: {
      seasonNum,
      episodeNum: episodeNum + 1,
    },
  };

  return (
    <ContentView
      isVisible={isModalVisible}
      backdropOpacity={0.7}
      swipeDirection="down"
      useNativeDriver
      useNativeDriverForBackdrop
      onBackButtonPress={hideModal}
      onSwipeComplete={hideModal}
      onBackdropPress={hideModal}>
      <Content>
        <Container>
          <Button
            onPress={() => {
              addMovie(webSeries).then(() => {
                hideModal();
                Vibration.vibrate(100);
              });
            }}>
            <StyledText>
              Add {data.title} Season {seasonNum} Episode {episodeNum}
            </StyledText>
          </Button>
          <Button cancel onPress={hideModal}>
            <StyledText cancel>Cancel</StyledText>
          </Button>
        </Container>
      </Content>
    </ContentView>
  );
};

AutoAddNextModal.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  uid: PropTypes.any.isRequired,
};

export default AutoAddNextModal;

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

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.cancel ? 'transparent' : props.theme.SECONDARY_BLUE};
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: ${(props) => (props.cancel ? 0 : 12)};
`;
const StyledText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${(props) =>
    props.cancel ? props.theme.PRIMARY_RED : props.theme.PRIMARY_BLUE};
`;
