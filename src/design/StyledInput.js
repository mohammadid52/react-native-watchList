import React from 'react';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';

const StyledInput = ({
  icon,
  password,
  placeholder,
  value,
  onChangeText,
  onFocus,
  focused,
  onBlur,
}) => (
  <Input
    key={icon}
    style={{
      padding: 22,
      borderColor: placeholder === focused ? '#2F81AD' : '#232c51',
    }}>
    <Feather style={{marginRight: 5}} name={icon} size={18} color="#f5f6f9" />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,.3)"
      secureTextEntry={password}
      selectionColor="rgba(255,255,255,.3)"
      onChangeText={onChangeText}
      value={value}
      onFocus={onFocus}
    />
  </Input>
);

export default StyledInput;

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
