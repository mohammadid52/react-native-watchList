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
import {
  updateSettingsDarkMode,
  updateSettingsDefaultDate,
  logOut,
} from '../../helpers';
import {useAuth} from '../../context/UserContext';
import * as storage from '../../storage';

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  const [defaultDate, setDefaultDate] = useState();

  const [dateIdx, setDateIdx] = useState(0);
  const {user} = useAuth();

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

  useEffect(() => {
    const unsub = async () => {
      try {
        const $theme = await storage.readThemePreference();
        const date = await storage.readDefaultDate();
        setTheme($theme);
        setDefaultDate(date);
      } catch (error) {
        console.error('error @useEffect in Settings: ', error);
      }
    };
    return () => unsub();
  }, [theme, defaultDate]);

  const changeTheme = () => {
    theme === 'dark'
      ? storage.writeThemePreference('light')
      : storage.writeThemePreference('dark');
  };
  const changeDate = () => {
    handlePress();
    storage.writeDefaultDate(defaultList[dateIdx]);
  };

  return (
    <View style={styles.container}>
      {/* <ScreenTitle screenTitle="Settings" /> */}
      <View style={styles.settingsContainer}>
        <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 30, fontFamily: 'Poppins-Medium'}}>Hey,</Text>
          <Text style={{fontSize: 30, fontFamily: 'Poppins-Medium'}}>
            {user.displayName}
          </Text>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
              Theme
            </Text>
          </View>

          <TouchableOpacity onPress={changeTheme}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                borderBottomWidth: 2,
                fontSize: 18,
                // opacity: opacity.darkMode,
              }}>
              {theme}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
            Default Date
          </Text>

          <View style={{zIndex: 1}}>
            <TouchableOpacity onPress={changeDate}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  borderBottomWidth: 2,
                  fontSize: 18,
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
                fontFamily: 'Poppins-Medium',
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
    padding: 30,
  },
  item: {
    backgroundColor: '#fff',
    marginBottom: 30,
    height: 60,
    // borderWidth: 2,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
  },
});
