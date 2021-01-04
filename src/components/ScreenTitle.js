import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';

const ScreenTitle = ({screenTitle, headerStyles, headerTitleStyles}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{screenTitle}</Text>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: colors.sharpRed,
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 100,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
