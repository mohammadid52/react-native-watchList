import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

const Empty = ({
  text = 'No Data',
  subText,
  home = true,
  imgHeight,
  imgWidth,
}) => {
  const {height} = Dimensions.get('screen');
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: home ? height - 130 : height,
      }}>
      <Image
        style={{height: 260, width: 200, resizeMode: 'contain'}}
        source={
          home
            ? require('../assets/images/empty1.png')
            : require('../assets/images/empty3.png')
        }
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
