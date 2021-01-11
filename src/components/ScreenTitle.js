import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';
import styled from 'styled-components';

const ScreenTitle = (props) => {
  return (
    <Container {...props}>
      <HeaderTitle {...props}>{props.screenTitle}</HeaderTitle>
    </Container>
  );
};

export default ScreenTitle;

const Container = styled.View`
  height: ${(props) => props.height ?? 100};
  background-color: ${(props) => props.backgroundColor ?? colors.sharpRed};
`;
const HeaderTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #fff;
  font-family: 'Poppins-SemiBold';
  line-height: ${(props) => props.lineHeight ?? props.height ?? 100};
`;
