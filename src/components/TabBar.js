import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Dimensions, View, Animated} from 'react-native';

import {Tab} from '.';
import {useTabBar} from '../context/TabBarProvider';

const {width} = Dimensions.get('screen');

const TabBar = ({state, navigation}) => {
  const {
    showTabBar,
    isModalVisible,
    setModalIsVisible,
    selected,
    setSelected,
  } = useTabBar();
  const {routes} = state;

  const animationValue = useRef(new Animated.Value(0)).current;

  const renderColor = (currentTab) =>
    currentTab === selected ? '#16c79a' : '#bbb';

  const handlePress = (routeName, index) => {
    if (state.index !== index) {
      if (routeName === 'Add') {
        setModalIsVisible(!isModalVisible);
      }
      setSelected(routeName);
      navigation.navigate(routeName);
    }
  };

  const toggleAnimatedTabBar = () => {
    if (showTabBar) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleAnimatedTabBar();
  }, [showTabBar]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, {transform: [{translateY: animationValue}]}]}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default TabBar;
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#393e46',
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
