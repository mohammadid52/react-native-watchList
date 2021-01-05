import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';

const ScreenTitle = ({screenTitle, height, backgroundColor}) => {
  return (
    <View
      style={{
        height: height || 100,
        backgroundColor: backgroundColor || colors.sharpRed,
      }}>
      <Text style={[styles.headerTitle, {lineHeight: height || 100}]}>
        {screenTitle}
      </Text>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
