import AsyncStorage from '@react-native-async-storage/async-storage';

const MODE_PREFERENCE = 'theme_preference';
const DEFAULT_DATE = 'default_date';

async function readThemePreference(defaultValue = '') {
  try {
    const mode = await AsyncStorage.getItem(MODE_PREFERENCE);
    if (mode !== null) {
      return mode;
    }
    return writeThemePreference(defaultValue);
  } catch (error) {
    console.error('error @readThemePreference: ', error);
  }
}

async function writeThemePreference(value = '') {
  try {
    const mode = await AsyncStorage.setItem(MODE_PREFERENCE, value);
    return mode;
  } catch (error) {
    console.error('error @writeThemePreference: ', error);
  }
}
async function readDefaultDate(defaultValue = '') {
  try {
    const date = await AsyncStorage.getItem(DEFAULT_DATE);

    if (date !== null) {
      return date;
    }
    return writeDefaultDate(defaultValue);
  } catch (error) {
    console.error('error @readDefaultDate: ', error);
  }
}

async function writeDefaultDate(value = '') {
  try {
    const date = await AsyncStorage.setItem(DEFAULT_DATE, value);
    return date;
  } catch (error) {
    console.error('error @writeDefaultDate: ', error);
  }
}

export {
  writeDefaultDate,
  readDefaultDate,
  readThemePreference,
  writeThemePreference,
};
