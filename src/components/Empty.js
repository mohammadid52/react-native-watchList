import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {colors} from '../constants';

const Empty = ({
  text = 'No Data',
  subText,
  home = false,
  imgHeight,
  imgWidth,
}) => {
  const {height} = Dimensions.get('screen');
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: home ? height - 350 : height,
      }}>
      <Image
        style={{height: 260, width: 200, resizeMode: 'contain'}}
        source={require('../assets/images/empty3.png')}
      />
      <Text
        style={{
          fontSize: 18,
          marginTop: 10,
          fontFamily: 'Poppins-SemiBold',
        }}>
        {text}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Poppins-Light',
        }}>
        Tip: {subText}
      </Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
