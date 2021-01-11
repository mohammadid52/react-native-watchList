import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';

import StyledInput from '../../design/StyledInput';
import {Button} from '../../design';

import {signUp} from '../../helpers';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [focused, setFocused] = useState(null);
  const disabled = !email || !password;

  const handleSignup = () => {
    const credentials = {email, password, username};
    signUp(credentials);
  };

  return (
    <Container style={{padding: 50}}>
      <KeyboardAvoidingView>
        <FormHeader style={{marginBottom: 12}}>Create Account</FormHeader>
        <FormHeader subheader>
          Fill your account details to create new account
        </FormHeader>
        <StyledInput
          placeholder="Username"
          icon="user"
          value={username}
          onChangeText={(username) => setUsername(username)}
          onFocus={() => setFocused('Username')}
          focused={focused}
        />
        <StyledInput
          placeholder="Email"
          icon="mail"
          onChangeText={(email) => setEmail(email)}
          value={email}
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
        <Button text={'Sign Up'} onPress={handleSignup} />
        <AlreadyAccount onPress={() => navigation.goBack()}>
          <AlreadyAccountText>Login</AlreadyAccountText>
        </AlreadyAccount>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signup;

const AlreadyAccount = styled.TouchableOpacity``;
const AlreadyAccountText = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Poppins-Light';
  margin-top: 15px;
  margin-bottom: 15px;
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
