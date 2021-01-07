import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import {useTabBar} from '../context/TabBarProvider';
import {colors} from '../constants';

const Tab = ({onPress, tab}) => {
  const {selected} = useTabBar();

  const getIconSizeColor = (name) => {
    const renderColor = (currentTab) =>
      currentTab === selected ? colors.sharpRed : colors.white1;
    const renderSize = (currentTab) => (currentTab === selected ? 21 : 17);

    switch (name) {
      case 'Home':
        return (
          <Feather
            name="home"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      case 'Settings':
        return (
          <Feather
            name="settings"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      case 'Add':
        return (
          <FontAwesome5
            name="plus"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      default:
        return (
          <Feather
            name="home"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.3}>
      {getIconSizeColor(tab.name)}
      {tab.name === selected && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#fc7e2f', '#f40552']}
          style={styles.decorator}></LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  decorator: {
    position: 'absolute',
    bottom: -7,
    backgroundColor: colors.sharpRed,
    width: 7,
    borderRadius: 10,
    height: 3,
  },
});
