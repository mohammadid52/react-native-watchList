import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import styled from 'styled-components';
import {colors} from '../constants';
import {addMovie, getDate} from '../helpers';
import useSettings from '../hooks/useSettings';

const AutoAddNextModal = ({
  isModalVisible = false,
  hideModal = () => {},
  data = {},
}) => {
  const {settings, loading} = useSettings();

  if (loading) {
    return <ActivityIndicator />;
  }

  const {defaultDate} = settings[0];

  const {seasonNum, episodeNum} = data.webSeries;

  const webSeries = {
    createdAt: moment().format('lll'),
    title: data.title,
    userId: 'j4fA81iLv6Czjs1Jh9fo',
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
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
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

export default AutoAddNextModal;

const ContentView = styled(Modal)`
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  background-color: #fff;
  padding: 22px;
  border-radius: 17px;
  min-width: 250px;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.cancel ? '#fff' : colors.lightBlue2)};
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: ${(props) => (props.cancel ? 0 : 12)};
`;
const StyledText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${(props) => (props.cancel ? colors.darkRed : colors.darkBlue)};
`;
