import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styled from 'styled-components';

import { useTabBar } from '../context/TabBarProvider';
import { colors } from '../constants';
import { addMovie, getDate } from '../helpers';
import { useAuth } from '../context/UserContext';
import * as storage from '../storage';

const { height, width } = Dimensions.get('screen');
const topGutter = 70;
const modalHeight = height - 200 - topGutter;
const inputWidth = width - topGutter - 20;

export default ({ navigation }) => {
  // text state holder
  const [title, setTitle] = useState('');
  const [seasonNum, setSeasonNum] = useState();
  const [episodeNum, setEpisodeNum] = useState();

  // checkbox bool
  const [isWebseries, setIsWebseries] = useState(false);

  const [loading, setLoading] = useState(false);
  const [defaultDate, setDefaultDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });

  const { setModalIsVisible, isModalVisible, setSelected } = useTabBar();

  const { user } = useAuth();

  useEffect(() => {
    const unsub = storage
      .readDefaultDate('Tonight (9PM)')
      .then((date) => setDefaultDate(date));
    return () => unsub;
  }, [dateTime]);

  const hideModal = () => {
    setSelected('HomeStack');
    navigation.navigate('HomeStack');
    setModalIsVisible(false);
    setTitle('');
    setIsWebseries(false);
    setSeasonNum();
    setEpisodeNum();
    setDateTime({
      data: '',
      time: '',
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (_datetime) => {
    hideDatePicker();
    setDateTime({
      date: moment(_datetime).format('ll'),
      time: moment(_datetime).format('LT'),
    });
  };

  const handlePress = () => {
    setLoading(true);
    const randomId = () => '000000000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));

    const movie = {
      id: randomId(),
      createdAt: moment().format('lll'),
      isWatched: false,
      title,
      toWatchAt: dateTime.date || getDate(defaultDate).toWatchAt,
      watchTime: dateTime.time || getDate(defaultDate).watchTime,
      userId: user.uid,
    };
    const webSeries = {
      ...movie,
      webSeries: {
        seasonNum: Number(seasonNum) || 1,
        episodeNum: Number(episodeNum) || 1,
      },
    };
    const data = isWebseries ? webSeries : movie;

    addMovie(data)
      .then(() => {
        setLoading(false);
        hideModal();
        Vibration.vibrate(100);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ContentView
      isVisible={isModalVisible}
      swipeDirection="down"
      onSwipeComplete={hideModal}
      useNativeDriver
      useNativeDriverForBackdrop
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
    >
      <StatusBar backgroundColor={colors.textColor} />

      <Styledkeyboard>
        <Container>
          <HeaderText>Add Movie/Series In Your Watch List</HeaderText>
          <View>
            <InputContainer>
              <Input
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
              />
              <CheckBoxContainer>
                <CheckBox
                  tintColor={colors.red}
                  tintColors={{ true: colors.green, false: colors.darkBlue }}
                  value={isWebseries}
                  onValueChange={() => setIsWebseries(!isWebseries)}
                />
                <CheckBoxText>Web Series?</CheckBoxText>
              </CheckBoxContainer>
              {isWebseries && (
                <WebInputContainer>
                  <WebInput
                    value={seasonNum}
                    onChangeText={(ssn) => setSeasonNum(ssn)}
                    placeholder="Season No."
                    keyboardType="numeric"
                  />
                  <WebInput
                    value={episodeNum}
                    onChangeText={(epi) => setEpisodeNum(epi)}
                    placeholder="Episode No."
                    keyboardType="numeric"
                  />
                </WebInputContainer>
              )}

              <View>
                <Button activeOpacity={0.8} onPress={showDatePicker}>
                  <DatePickerText>
                    {!dateTime.date && !dateTime.time
                      ? 'Set Date'
                      : ` On ${dateTime.date} At ${dateTime.time}`}
                  </DatePickerText>
                </Button>

                {!dateTime.date && !dateTime.time && (
                  <LeaveText>Leave Blank For Default Date</LeaveText>
                )}
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />

              <AddButton activeOpacity={0.8} onPress={handlePress}>
                <AddText>
                  {loading
                    ? 'Adding...'
                    : isWebseries
                      ? 'Add Web Series'
                      : 'Add Movie'}
                </AddText>
              </AddButton>
            </InputContainer>
          </View>
        </Container>
      </Styledkeyboard>
    </ContentView>
  );
};

const ContentView = styled(Modal).attrs((props) => ({
  backdropColor: props.theme.PRIMARY_BG,
  backdropOpacity: props.theme.mode === 'dark' ? 0.8 : 0.5,
}))``;
const Styledkeyboard = styled(KeyboardAwareScrollView)`
  background-color: ${(props) => props.theme.PRIMARY_BG_CARD};
  padding: 22px;
  border-top-right-radius: 17px;
  border-top-left-radius: 17px;
  border-radius: 17px;
`;
const Container = styled.View`
  margin-top: 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const InputContainer = styled.View`
  padding-left: 32px;
  padding-right: 32px;
`;
const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.PRIMARY_TEXT_COLOR,
}))`
  font-family: 'Poppins-Regular';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  width: ${inputWidth}px;
  height: 48px;
  border-radius: 6px;
  padding-left: 10px;
  padding-right: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${colors.darkBlue} /* Change Theme Here */;
  margin-bottom: 16px;
`;

const WebInputContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 0px;
  padding-bottom: 10px;
`;

const WebInput = styled(Input)`
  width: ${inputWidth / 2.1}px;
`;

const WebInputRow = styled(WebInput)`
  width: ${inputWidth / 2.1}px;
  margin-right: 8px;
`;
const Button = styled(TouchableOpacity)`
  width: ${inputWidth}px;
  border-radius: 6px;
  padding: 10px;
  margin-top: 0px;
  background-color: ${(props) => props.theme.PRIMARY_BLUE};
`;
const AddButton = styled(Button)`
  margin-top: 32px;
  background-color: ${(props) => props.theme.PRIMARY_RED};
`;
const CheckBoxText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;
const DatePickerText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Medium';
  font-size: 17px;
  text-align: center;
`;
const LeaveText = styled.Text`
  margin-top: 4px;
  font-family: 'Poppins-LightItalic';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR}; /* Change Theme Here */
  font-size: 11px;
`;
const AddText = styled.Text`
  color: #fff /* Change Theme Here */;
  font-family: 'Poppins-Medium';
  font-size: 17px;
  text-align: center;
`;
