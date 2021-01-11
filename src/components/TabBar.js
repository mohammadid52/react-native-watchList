import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {Dimensions, Animated} from 'react-native';
import styled from 'styled-components';

import {Tab} from '.';
import {colors} from '../constants';
import {useTabBar} from '../context/TabBarProvider';

const {width} = Dimensions.get('screen');

const TabBar = ({state, navigation}) => {
  const {
    showTabBar,
    isModalVisible,
    setModalIsVisible,
    setSelected,
  } = useTabBar();
  const {routes} = state;

  const animationValue = useRef(new Animated.Value(0)).current;

  const handlePress = (routeName) => {
    if (routeName === 'Add') {
      setModalIsVisible(!isModalVisible);
    }
    if (routeName === 'HomeStack') {
      setSelected(routeName);
      navigation.navigate('Home');
    }

    setSelected(routeName);
    navigation.navigate(routeName);
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
    <Container>
      <InnerContainer
        style={{elevation: 9, transform: [{translateY: animationValue}]}}>
        {routes.map((route) => (
          <Tab
            tab={route}
            onPress={() => handlePress(route.name)}
            key={route.key}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

TabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    routes: PropTypes.shape({
      map: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
export default TabBar;

const Container = styled.View`
  position: absolute;
  bottom: 25px;
  width: ${width}px;
  align-items: center;
`;

const InnerContainer = styled(Animated.View)`
  height: 50px;
  background-color: ${colors.textColor} /* Theme Change Here */;
  width: 300px;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  padding-left: 20px;
  padding-right: 20px;
`;
