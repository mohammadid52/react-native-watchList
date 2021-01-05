import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      case 'Watched':
        return (
          <Ionicons
            name="time-outline"
            size={3 + renderSize(name)}
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {getIconSizeColor(tab.name)}
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
