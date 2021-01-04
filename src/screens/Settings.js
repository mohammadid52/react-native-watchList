import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {ScreenTitle} from '../components';

const Settings = () => {
  return (
    <View style={styles.container}>
      <ScreenTitle screenTitle="Settings List" />
      <Text>Settings Screen</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
