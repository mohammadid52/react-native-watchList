import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Settings, Watched, Content, Auth} from '../screens';
import {TabBar} from '../components';
import {AddNewModal} from '../modal';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none" initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="All" component={Content} />
    <HomeStack.Screen name="Today" component={Content} />
    <HomeStack.Screen name="Tomorrow" component={Content} />
    <HomeStack.Screen name="This-Week" component={Content} />
    <HomeStack.Screen name="Watched" component={Content} />
  </HomeStack.Navigator>
);

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

export const AppStack = ({user}) =>
  user ? (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeStack" component={HomeNavigator} />
      <Tab.Screen name="Add" component={AddNewModal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  ) : (
    <AuthStack.Navigator headerMode="none" initialRouteName="Get_Started">
      <AuthStack.Screen name="Loading" component={Auth.Loading} />
      <AuthStack.Screen
        name="Get_Started"
        component={Auth.GetStarted}
        options={horizontalAnimation}
      />
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
