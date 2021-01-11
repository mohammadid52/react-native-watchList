import React, { createRef, useEffect } from 'react';
import {
  StatusBar, StyleSheet, Text, View,
} from 'react-native';

import LottieView from 'lottie-react-native';
import { colors } from '../constants';

const Loading = ({ navigation }) => (
  <View
    style={{
      backgroundColor: '#181f3d',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
    }}
  >
    <StatusBar hidden />
    <LottieView
      source={require('../assets/animation.json')}
      autoPlay
      loop
      duration={2000}
    />
  </View>
);

export default Loading;
