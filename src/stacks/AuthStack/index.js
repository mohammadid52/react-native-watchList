import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from '../../screens';

const AuthStack = createStackNavigator();

const horizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}) => {
    return {
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
    };
  },
};

export const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={Auth.Login}
      options={horizontalAnimation}
    />
    <AuthStack.Screen
      name="Signup"
      component={Auth.Signup}
      options={horizontalAnimation}
    />
  </AuthStack.Navigator>
);
