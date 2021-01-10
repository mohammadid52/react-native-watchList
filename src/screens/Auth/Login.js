import React, {useState} from 'react';
import {StatusBar, KeyboardAvoidingView, View} from 'react-native';
import styled from 'styled-components';

// icons
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NextButton from '../../design/NextButton';
import StyledInput from '../../design/StyledInput';

import {colors} from '../../constants';
import {login} from '../../helpers';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(null);
  const disabled = !email || !password;

  const handleLogin = () => {
    const credentials = {email, password};
    login(credentials);
  };

  return (
    <Container style={{padding: 50}}>
      <StatusBar backgroundColor="#181f3d" />

      <KeyboardAvoidingView behavior="position" enabled>
        <FormHeader style={{marginBottom: 12}}>Welcome Back</FormHeader>
        <FormHeader subheader>Fill your account details for login</FormHeader>
        <StyledInput
          placeholder="Email"
          icon="mail"
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
        <NextButton text="Login" onPress={handleLogin} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <NoAccount onPress={() => navigation.navigate('Signup')}>
            <NoAccountText>Create Account</NoAccountText>
          </NoAccount>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;

const NoAccount = styled.TouchableOpacity``;

const NoAccountText = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Poppins-Light';
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: right;
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

// #e94560
// #16213e
// #1f4068
// #602080
// #b030b0
// #0f3460
// #1a1a2e
// #f5f6f9
