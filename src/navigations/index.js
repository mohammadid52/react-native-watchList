import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Settings, Watched} from '../screens';
import {TabBar} from '../components';
import {AddNewModal} from '../modal';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Add" component={AddNewModal} />
    <Tab.Screen name="Watched" component={Watched} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
