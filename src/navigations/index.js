import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Settings, Watched, Content} from '../screens';
import {TabBar} from '../components';
import {AddNewModal} from '../modal';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

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

export const BottomNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name="HomeStack" component={HomeNavigator} />
    <Tab.Screen name="Add" component={AddNewModal} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
