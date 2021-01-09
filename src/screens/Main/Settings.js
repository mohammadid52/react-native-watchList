import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {debounce, findIndex} from 'lodash';

import {ScreenTitle} from '../../components';
import {colors} from '../../constants';
import useSettings from '../../hooks/useSettings';
import {
  updateSettingsDarkMode,
  updateSettingsDefaultDate,
  logOut,
} from '../../helpers';

const Settings = () => {
  const [opacity, setOpacity] = useState({darkMode: 1, defaultDate: 1});
  const {settings, loading} = useSettings();

  const [dateIdx, setDateIdx] = useState(0);

  const defaultList = [
    'After Hour',
    'Tonight (9PM)',
    'Tomorrow',
    'This Saturday(9 PM)',
    'This Sunday(9 PM)',
  ];

  const handlePress = () => {
    if (dateIdx >= 0) {
      setDateIdx(dateIdx + 1);
    }
    if (dateIdx === 3) {
      setDateIdx(0);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  const {id, darkModeEnabled, defaultDate} = settings[0];
  const updateDarkMode = debounce(() => {
    updateSettingsDarkMode(id, darkModeEnabled).then(() => {
      setOpacity({...opacity, darkMode: 1});
    });
  }, 2000);

  const updateDefaultDate = debounce(() => {
    handlePress();
    updateSettingsDefaultDate(id, defaultList[dateIdx]).then(() => {
      setOpacity({...opacity, defaultDate: 1});
    });
  }, 1000);

  return (
    <View style={styles.container}>
      <ScreenTitle screenTitle="Settings" />
      <View style={styles.settingsContainer}>
        <View style={styles.item}>
          <View>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>
              Dark Mode
            </Text>
          </View>

          <TouchableOpacity
            disabled={opacity.darkMode === 0.3}
            onPress={() => {
              setOpacity({...opacity, darkMode: 0.3});
              updateDarkMode();
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                borderBottomWidth: 2,
                fontSize: 18,
                opacity: opacity.darkMode,
              }}>
              {darkModeEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>
            Default Date
          </Text>

          <View style={{zIndex: 1}}>
            <TouchableOpacity
              disabled={opacity.defaultDate === 0.3}
              activeOpacity={opacity.defaultDate}
              onPress={() => {
                setOpacity({...opacity, defaultDate: 0.3});
                updateDefaultDate();
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  borderBottomWidth: 2,
                  fontSize: 18,
                  opacity: opacity.defaultDate,
                }}>
                {defaultDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.item, {justifyContent: 'center'}]}>
          <TouchableOpacity onPress={() => logOut()}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                color: colors.red,
              }}>
              Logout
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
    backgroundColor: '#fff',
    margin: 15,
    height: 60,
    borderWidth: 2,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
  },
});
