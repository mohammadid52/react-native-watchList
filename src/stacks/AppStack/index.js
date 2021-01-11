import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// stacks
import {AuthStackScreen} from '../AuthStack';
import {MainStackScreen} from '../MainStack';
import {useAuth} from '../../context/UserContext';
import {Loading} from '../../screens';
import {StatusBar} from 'react-native';

const AppStack = createStackNavigator();

export const AppStackNavigator = () => {
  const {user} = useAuth();

  const loadingAssets = user === null;

  return (
    <AppStack.Navigator headerMode="none">
      {loadingAssets ? (
        <AppStack.Screen name="Loading" component={Loading} />
      ) : !user ? (
        <AppStack.Screen name="Auth" component={AuthStackScreen} />
      ) : (
        <AppStack.Screen name="Main" component={MainStackScreen} />
      )}
    </AppStack.Navigator>
  );
};
