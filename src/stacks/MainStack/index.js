import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from '../../screens';
import { TabBar } from '../../components';
import { AddNewModal } from '../../modal';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Main.Home} />
    <HomeStack.Screen name="All" component={Main.Content} />
    <HomeStack.Screen name="Today" component={Main.Content} />
    <HomeStack.Screen name="Tomorrow" component={Main.Content} />
    <HomeStack.Screen name="This-Week" component={Main.Content} />
    <HomeStack.Screen name="Watched" component={Main.Content} />
  </HomeStack.Navigator>
);

export const MainStackScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    tabBar={(props) => <TabBar {...props} />}
  >
    <Tab.Screen name="HomeStack" component={HomeNavigator} />
    <Tab.Screen name="Add" component={AddNewModal} />
    <Tab.Screen name="Settings" component={Main.Settings} />
  </Tab.Navigator>
);
