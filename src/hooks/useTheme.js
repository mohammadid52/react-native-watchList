import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {darkTheme, lightTheme} from '../constants/colors';

const THEME_PREFERENCE = 'theme';
const DefaultTheme = darkTheme;

const useTheme = () => {
  const [theme, setTheme] = useState(darkTheme);
  const readTheme = async () => {
    try {
      const $theme = await AsyncStorage.getItem(THEME_PREFERENCE);
      if ($theme !== null) {
        setTheme(JSON.parse($theme));
      } else {
        await AsyncStorage.setItem(THEME_PREFERENCE, JSON.stringify(darkTheme));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mode = theme.mode;
  const updateTheme = async (value) => {
    const $theme = value === 'dark' ? lightTheme : darkTheme;
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE, JSON.stringify($theme));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readTheme();
    return () => readTheme();
  }, [mode]);

  return {
    updateTheme,
    theme,
    mode,
  };
};

export default useTheme;
