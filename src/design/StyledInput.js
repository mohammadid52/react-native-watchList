import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const StyledInput = ({
  icon,
  password,
  placeholder,
  value,
  onChangeText,
  onFocus,
  focused,
}) => (
  <Input
    key={icon}
    style={{
      padding: 22,
      borderColor: placeholder === focused ? '#2F81AD' : '#232c51',
    }}
  >
    <Feather style={{ marginRight: 5 }} name={icon} size={18} color="#f5f6f9" />
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

StyledInput.propTypes = {
  focused: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  onChangeText: PropTypes.any.isRequired,
  onFocus: PropTypes.any.isRequired,
  password: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default StyledInput;

const Input = styled.View`
  height: 50px;
  border-width: 1px;
  background-color: #232c51;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
`;
const TextInput = styled.TextInput`
  font-size: 15px;
  font-family: 'Poppins-Regular';
  color: #fff;
  height: 50px;
  width: ${width - 150}px;
`;
