import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from '../../screens';

const AuthStack = createStackNavigator();

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  }),
};

export const AuthStackScreen = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const FIRST_TIME = 'user:first-time';

  useEffect(() => {
    readData();
  }, []);

  async function readData() {
    try {
      const val = await AsyncStorage.getItem(FIRST_TIME);

      if (val !== null) {
        setIsFirstTime(false);
      } else {
        setIsFirstTime(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthStack.Navigator headerMode="none">
      {isFirstTime ? (
        <AuthStack.Screen
          name="Get_Started"
          component={Auth.GetStarted}
          options={horizontalAnimation}
        />
      ) : (
        <AuthStack.Screen
          name="Login"
          component={Auth.Login}
          options={horizontalAnimation}
        />
      )}

      <AuthStack.Screen
        name="Signup"
        component={Auth.Signup}
        options={horizontalAnimation}
      />
    </AuthStack.Navigator>
  );
};
