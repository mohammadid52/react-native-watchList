import React, {useRef, useEffect} from 'react';
import {StatusBar, View, Image, Animated} from 'react-native';
import styled from 'styled-components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import NextButton from '../../design/NextButton';

const GetStarted = ({navigation}) => {
  return (
    <Container style={{padding: 40}}>
      <StatusBar hidden backgroundColor="#16213e" barStyle="light-content" />
      <Image
        style={{width: 320, height: 305}}
        source={require('../../assets/images/empty2.png')}
      />
      <HeaderText>Welcome to MyWatchList</HeaderText>
      <SubText>
        Your own list of movies and webseries at your fingertips. Now manage
        time with entertainment
      </SubText>
      <NextButton
        onPress={() => navigation.navigate('Login')}
        text={'Get Started'}
      />
    </Container>
  );
};

export default GetStarted;

const GetStartedButton = styled.TouchableOpacity`
  background-color: #de385b;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 24px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: #f5f6f9;
  font-family: 'Poppins-Regular';
`;

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
  letter-spacing: 1;
`;
const SubText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #f5f6f9;
  font-family: 'Poppins-Medium';
  margin-top: 10px;
  letter-spacing: 0.5;
`;

// #e94560
// #16213e
// #1f4068
// #602080
// #b030b0
// #0f3460
// #1a1a2e
// #f5f6f9
