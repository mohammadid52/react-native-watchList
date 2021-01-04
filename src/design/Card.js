import {filter, find, findIndex} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from '../constants';
import {watchAction} from '../helpers';
import {MovieModal} from '../modal';

const {width} = Dimensions.get('screen');

const cardWidth = width - 20;

const Card = ({list}) => {
  const [isModalVisible, setIsModalIsVisible] = useState(false);

  const handleCheck = (movieId, currentValue) => {
    watchAction(movieId, currentValue);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onLongPress={() => setIsModalIsVisible(true)}
      style={styles.Card}>
      <MovieModal
        isModalVisible={isModalVisible}
        setModalIsVisible={setIsModalIsVisible}
        data={list}
      />
      <View>
        <Text style={styles.title}>{list.title}</Text>
        <Text style={styles.time}>
          {list.toWatchAt} {list.watchTime}
        </Text>
      </View>
      <TouchableHighlight>
        <AntDesign
          size={20}
          color={list.isWatched ? colors.red : colors.gray}
          onPress={() => handleCheck(list.movieId, list.isWatched)}
          name={list.isWatched ? 'checksquare' : 'checksquareo'}
        />
      </TouchableHighlight>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  Card: {
    height: 70,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 6,
    borderLeftWidth: 6,
    borderLeftColor: colors.lightBlue,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  cardContent: {},
  title: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.gray,
  },
});
