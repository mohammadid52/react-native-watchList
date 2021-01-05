import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {useTabBar} from '../context/TabBarProvider';
import {BackButton} from '../components';
import {colors} from '../constants';
import {addMovie} from '../helpers';

const {height, width} = Dimensions.get('screen');
const topGutter = 70;
const modalHeight = height - 200 - topGutter;
const inputWidth = width - topGutter;

export default ({navigation}) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isWebseries, setIsWebseries] = useState(false);
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });

  const {setModalIsVisible, isModalVisible, setSelected} = useTabBar();
  const hideModal = () => {
    setSelected('HomeStack');
    navigation.navigate('HomeStack');
    setModalIsVisible(false);
    setTitle('');
    setIsWebseries(false);
    setDateTime({
      data: '',
      time: '',
    });
  };
  const handlePress = () => {
    setLoading(true);

    const randomId = () => {
      return '000000000000'.replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
    };

    const movie = {
      id: randomId(),
      createdAt: moment().format('lll'),
      isWatched: false,
      isWebseries,
      title,
      toWatchAt: dateTime.date || moment().format('ll'),
      watchTime: dateTime.time || moment().format('LT'),
      userId: 'j4fA81iLv6Czjs1Jh9fo',
    };
    addMovie(movie)
      .then(() => {
        setLoading(false);
        hideModal();
      })
      .catch((err) => console.error(err));
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

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      style={styles.contentView}
      animationIn="slideInUp"
      animationInTiming={300}
      animationOut="fadeOutDownBig"
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      backdropColor="#000">
      <StatusBar backgroundColor={colors.textColor} />
      <View style={[styles.content, {height: modalHeight}]}>
        <BackButton
          goBack={() => {
            hideModal();
          }}
        />

        <View
          style={{
            marginTop: 70,
            // height: modalHeight,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.header}>Add Movie/Series In Your Watch List</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <CheckBox
                  tintColor={colors.red}
                  tintColors={{true: colors.green, false: colors.darkBlue}}
                  value={isWebseries}
                  onValueChange={() => setIsWebseries(!isWebseries)}
                />
                <Text style={{fontFamily: 'Poppins-Regular'}}>Web Series?</Text>
              </View>

              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={showDatePicker}
                  style={[
                    styles.btn,
                    {marginTop: 0, backgroundColor: colors.textColor},
                  ]}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 17,
                      textAlign: 'center',
                    }}>
                    {!dateTime.date && !dateTime.time
                      ? 'Set Date'
                      : ` On ${dateTime.date} At ${dateTime.time}`}
                  </Text>
                </TouchableOpacity>

                {!dateTime.date && !dateTime.time && (
                  <Text
                    style={{
                      marginTop: 4,
                      fontFamily: 'Poppins-LightItalic',
                      color: '#000',
                      fontSize: 11,
                    }}>
                    Leave Blank For Default Date
                  </Text>
                )}
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, {marginTop: 32}]}
                onPress={handlePress}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    textAlign: 'center',
                  }}>
                  {loading
                    ? 'Adding...'
                    : isWebseries
                    ? 'Add Web Series'
                    : 'Add Movie'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  header: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    paddingHorizontal: 32,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    width: inputWidth,
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.darkBlue,
    marginBottom: 16,
  },
  btn: {
    width: inputWidth,
    backgroundColor: colors.sharpRed,
    borderRadius: 6,
    padding: 10,
  },
});
