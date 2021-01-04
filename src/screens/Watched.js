import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

const Watched = () => {
  return (
    <View style={styles.container}>
      <Text>Watched Screen</Text>
    </View>
  );
};

export default Watched;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
