import AsyncStorage from '@react-native-async-storage/async-storage';

const MODE_PREFERENCE = 'theme_preference';
const DEFAULT_DATE = 'default_date';

export const readThemePreference = async (defaultValue = '') => {
  try {
    const mode = await AsyncStorage.getItem(MODE_PREFERENCE);
    if (mode !== null) {
      return mode;
    } else {
      return writeThemePreference(defaultValue);
    }
  } catch (error) {
    console.error('error @readThemePreference: ', error);
  }
};

export const writeThemePreference = async (value = '') => {
  try {
    const mode = await AsyncStorage.setItem(MODE_PREFERENCE, value);
    return mode;
  } catch (error) {
    console.error('error @writeThemePreference: ', error);
  }
};
export const readDefaultDate = async (defaultValue = '') => {
  try {
    const date = await AsyncStorage.getItem(DEFAULT_DATE);

    if (date !== null) {
      return date;
    } else {
      return writeDefaultDate(defaultValue);
    }
  } catch (error) {
    console.error('error @readDefaultDate: ', error);
  }
};

export const writeDefaultDate = async (value = '') => {
  try {
    const date = await AsyncStorage.setItem(DEFAULT_DATE, value);
    return date;
  } catch (error) {
    console.error('error @writeDefaultDate: ', error);
  }
};
