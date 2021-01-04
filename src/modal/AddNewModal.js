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
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {useTabBar} from '../context/TabBarProvider';
import {BackButton} from '../components';
import {colors} from '../constants';
import {addMovie} from '../helpers';

const {height, width} = Dimensions.get('screen');
const topGutter = 70;
const modalHeight = height - topGutter;
const inputWidth = width - topGutter;

export default ({navigation}) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {setModalIsVisible, isModalVisible, setSelected} = useTabBar();
  const hideModal = () => {
    navigation.navigate('Home');
    setSelected('Home');
    setModalIsVisible(false);
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
      title,
      toWatchAt: dateTime.date,
      watchTime: dateTime.time,
      userId: 'j4fA81iLv6Czjs1Jh9fo',
    };
    addMovie(movie).then(() => {
      setLoading(false);
      hideModal();
      setTitle('');
      setDateTime({
        date: '',
        time: '',
      });
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (datetime) => {
    hideDatePicker();
    setDateTime({
      date: moment(datetime).format('ll'),
      time: moment(datetime).format('LT'),
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
      <StatusBar backgroundColor={colors.lightBlue} />
      <View style={styles.content}>
        <BackButton
          goBack={() => {
            hideModal();
          }}
        />
        <View style={{marginTop: 270}}>
          <Text style={styles.header}>Add Movie In Your Watch List</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
              />
              <TouchableOpacity
                onPress={showDatePicker}
                style={[
                  styles.btn,
                  {marginBottom: 32, backgroundColor: colors.lightBlue},
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
                    : `On ${dateTime.date} At ${dateTime.time}`}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />

              <TouchableOpacity style={styles.btn} onPress={handlePress}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 17,
                    textAlign: 'center',
                  }}>
                  {loading ? 'Adding...' : 'Add Movie'}
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
    height: modalHeight,
  },
  header: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    paddingHorizontal: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    width: inputWidth,
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.green,
    marginBottom: 16,
  },
  btn: {
    width: inputWidth,
    backgroundColor: colors.green,
    borderRadius: 6,
    padding: 10,
  },
});

{
  /*  */
}
