import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {ScreenTitle} from '../components';
import {colors} from '../constants';

const Settings = () => {
  const [darkmodeOverlay, setDarkmodeOverlay] = useState(false);
  return (
    <View style={styles.container}>
      <ScreenTitle screenTitle="Settings List" />
      <View style={styles.settingsContainer}>
        <View style={styles.item}>
          <View>
            <Text style={{fontFamily: 'Poppins-SemiBold'}}>Dark Mode</Text>
          </View>

          <TouchableOpacity
            onPress={() => setDarkmodeOverlay(!darkmodeOverlay)}>
            <Text style={{fontFamily: 'Poppins-SemiBold'}}>
              {darkmodeOverlay ? 'Enabled' : 'Disabled'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  settingsContainer: {
    flex: 1,
  },
  item: {
    margin: 15,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
