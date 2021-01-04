import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = ({goBack}) => {
  return (
    <TouchableOpacity style={styles.goBack} onPress={goBack}>
      <View>
        <Ionicons name="return-up-back" color="#000" size={25} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    height: 40,
    width: 40,
    paddingBottom: 20,
  },
});
