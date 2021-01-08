import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components';

// icons
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NextButton from '../../design/NextButton';
// import StyledInput from '../../defsi';

import {colors} from '../../constants';

const {width} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(null);
  const disabled = !email || !password;

  return (
    <Container style={{padding: 50}}>
      <KeyboardAvoidingView behavior="position" enabled>
        <FormHeader style={{marginBottom: 12}}>Welcome Back</FormHeader>
        <FormHeader subheader>Fill your account details for login</FormHeader>
        <StyledInput
          placeholder="Email"
          icon="user"
          value={email}
          onChangeText={(email) => setEmail(email)}
          onFocus={() => setFocused('Email')}
          focused={focused}
        />
        <StyledInput
          placeholder="Password"
          icon="lock"
          password
          onChangeText={(password) => setPassword(password)}
          value={password}
          onFocus={() => setFocused('Password')}
          focused={focused}
        />
        <NextButton text="Login" />
        <NoAccount onPress={() => navigation.navigate('Signup')}>
          <NoAccountText>Create Account</NoAccountText>
        </NoAccount>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;

const NoAccount = styled.TouchableOpacity``;

const NoAccountText = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Poppins-Light';
  margin-top: 15;
  margin-bottom: 15;
  text-align: right;
`;

const GetStartedButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? 'rgba(222,56,91, .5)' : '#DE385B'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6;
  margin-top: 30;
`;

const StyledText = styled.Text`
  font-size: 20;
  color: #f5f6f9;
  font-family: 'Poppins-Regular';
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #181f3d;
`;

const FormHeader = styled.Text`
  text-align: left;
  font-size: ${(props) => (props.subheader ? 15 : 33)};
  font-family: ${(props) =>
    props.subheader ? 'Poppins-Thin' : 'Poppins-Regular'};
  color: #f5f6f9;
`;

const Input = styled.View`
  height: 50;
  border-width: 1;
  background-color: #232c51;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10;
  margin-bottom: 15;
  margin-top: 15;
`;
const TextInput = styled.TextInput`
  font-size: 15;
  font-family: 'Poppins-Regular';
  color: #fff;
  height: 50;
  width: ${width - 150};
`;

// #e94560
// #16213e
// #1f4068
// #602080
// #b030b0
// #0f3460
// #1a1a2e
// #f5f6f9
