import React from 'react';
import styled from 'styled-components';
import {colors} from '../constants';

const ScreenTitle = (props) => (
  <Container
    height={props.height}
    lineHeight={props.lineHeight}
    backgroundColor={props.backgroundColor}>
    <HeaderTitle height={props.height} lineHeight={props.lineHeight}>
      {props.screenTitle}
    </HeaderTitle>
  </Container>
);

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
