import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants';

const BackButton = ({goBack = () => {}}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.goBack} onPress={goBack}>
      <Ionicons name="return-up-back" color={colors.red} size={25} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
