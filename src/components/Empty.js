import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components';

const { height } = Dimensions.get('screen');
const Empty = ({ text = 'No Data', subText = '', home = false }) => (
  <Container home={home}>
    <Image
      style={{ height: 260, width: 200, resizeMode: 'contain' }}
      source={require('../assets/images/empty3.png')}
    />
    <MainText>{text}</MainText>
    <Tip>Tip: {subText}</Tip>
  </Container>
);

Empty.propTypes = {
  home: PropTypes.bool.isRequired,
  subText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Empty;

const Container = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BG};
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.home ? height - 350 : height - 150)}px;
`;

const MainText = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-family: 'Poppins-SemiBold';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const Tip = styled.Text`
  font-size: 15px;
  font-family: 'Poppins-Light';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
