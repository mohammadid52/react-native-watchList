import React from 'react';
import { StatusBar, Image, Animated } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../design';

const GetStarted = () => {
  const FIRST_TIME = 'user:first-time';

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(FIRST_TIME, 'already-user');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ padding: 40 }}>
      <StatusBar hidden backgroundColor="#16213e" barStyle="light-content" />
      <Image
        style={{ width: 320, height: 305 }}
        source={require('../../assets/images/empty2.png')}
      />
      <HeaderText>Welcome to MyWatchList</HeaderText>
      <SubText>
        Your own list of movies and webseries at your fingertips. Now manage
        time with entertainment
      </SubText>
      <Button onPress={() => saveData()} text="Get Started" />
    </Container>
  );
};

export default GetStarted;

const Container = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #181f3d;
`;

const HeaderText = styled.Text`
  font-size: 23px;
  color: #f5f6f9;
  font-family: 'Poppins-SemiBold';
  margin-top: 30px;
  margin-bottom: 15px;
  letter-spacing: 1px;
`;
const SubText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #f5f6f9;
  font-family: 'Poppins-Medium';
  margin-top: 10px;
  letter-spacing: 0.5px;
`;

// #e94560
// #16213e
// #1f4068
// #602080
// #b030b0
// #0f3460
// #1a1a2e
// #f5f6f9
