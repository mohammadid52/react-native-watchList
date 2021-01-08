import React, {useState} from 'react';

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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styled from 'styled-components';

import {useTabBar} from '../context/TabBarProvider';
import {BackButton} from '../components';
import {colors} from '../constants';
import {addMovie, getDate} from '../helpers';
import useSettings from '../hooks/useSettings';

const {height, width} = Dimensions.get('screen');
const topGutter = 70;
const modalHeight = height - 200 - topGutter;
const inputWidth = width - topGutter - 20;

export default ({navigation}) => {
  // text state holder
  const [title, setTitle] = useState('');
  const [seasonNum, setSeasonNum] = useState();
  const [episodeNum, setEpisodeNum] = useState();

  // checkbox bool
  const [isWebseries, setIsWebseries] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });

  const {setModalIsVisible, isModalVisible, setSelected} = useTabBar();

  const {settings} = useSettings();

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
    const {defaultDate} = settings[0];
    const randomId = () => {
      return '000000000000'.replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
    };

    const movie = {
      id: randomId(),
      createdAt: moment().format('lll'),
      isWatched: false,
      title,
      toWatchAt: dateTime.date || getDate(defaultDate).toWatchAt,
      watchTime: dateTime.time || getDate(defaultDate).watchTime,
      userId: 'j4fA81iLv6Czjs1Jh9fo',
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
      backdropOpacity={0.6}
      swipeDirection="down"
      onSwipeComplete={hideModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}>
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
                  tintColors={{true: colors.green, false: colors.darkBlue}}
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

const ContentView = styled(Modal)`
  /* justify-content: flex-end; */
  /* margin: 0; */
`;
const Styledkeyboard = styled(KeyboardAwareScrollView)`
  background-color: #fff;
  padding-left: 22;
  padding-right: 22;
  padding-top: 22;
  padding-bottom: 22;
  border-top-right-radius: 17;
  border-top-left-radius: 17;
  border-radius: 17;
`;
const Container = styled.View`
  margin-top: 70;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.Text`
  margin-top: 20;
  margin-bottom: 20;
  text-align: center;
  font-size: 18;
  font-family: 'Poppins-SemiBold';
`;
const InputContainer = styled.View`
  padding-left: 32;
  padding-right: 32;
`;
const Input = styled.TextInput`
  font-family: 'Poppins-Regular';
  color: #000;
  width: ${inputWidth};
  height: 48;
  border-radius: 6;
  padding-left: 10;
  padding-right: 10;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: ${colors.darkBlue};
  margin-bottom: 16;
`;

const WebInputContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10;
  margin-top: 0;
  padding-bottom: 10;
`;

const WebInput = styled(Input)`
  width: ${inputWidth / 2.1};
`;

const WebInputRow = styled(WebInput)`
  width: ${inputWidth / 2.1};
  margin-right: 8;
`;
const Button = styled(TouchableOpacity)`
  width: ${inputWidth};
  border-radius: 6;
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom: 10;
  margin-top: 0;
  background-color: ${colors.textColor};
`;
const AddButton = styled(Button)`
  margin-top: 32;
  background-color: ${colors.sharpRed};
`;
const CheckBoxText = styled.Text`
  font-family: 'Poppins-Regular';
`;
const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12;
`;
const DatePickerText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Medium';
  font-size: 17;
  text-align: center;
`;
const LeaveText = styled.Text`
  margin-top: 4;
  font-family: 'Poppins-LightItalic';
  color: #000;
  font-size: 11;
`;
const AddText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Medium';
  font-size: 17;
  text-align: center;
`;
