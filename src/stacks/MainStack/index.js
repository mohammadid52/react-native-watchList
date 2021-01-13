import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Main} from '../../screens';
import {TabBar} from '../../components';
import {AddNewModal} from '../../modal';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}) => ({
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

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen
      name="Home"
      component={Main.Home}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="All"
      component={Main.Content}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="Today"
      component={Main.Content}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="Tomorrow"
      component={Main.Content}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="This-Week"
      component={Main.Content}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="Watched"
      component={Main.Content}
      options={horizontalAnimation}
    />
    <HomeStack.Screen
      name="Settings"
      component={Main.Settings}
      options={horizontalAnimation}
    />
  </HomeStack.Navigator>
);

const ModalComponent = () => null;

export const MainStackScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name="HomeStack" component={HomeNavigator} />
    <Tab.Screen name="Add" component={ModalComponent} />
    <Tab.Screen name="Settings" component={Main.Settings} />
  </Tab.Navigator>
);
