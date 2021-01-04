import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = ({onPress, color, tab}) => {
  const getIcon = (name) => {
    switch (name) {
      case 'Home':
        return <Feather name="home" size={20} color={color} />;
      case 'Settings':
        return <Feather name="settings" size={20} color={color} />;
      case 'Add':
        return <FontAwesome5 name="plus" size={20} color={color} />;
      default:
        return <Feather name="home" size={20} color={color} />;
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {getIcon(tab.name)}
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
