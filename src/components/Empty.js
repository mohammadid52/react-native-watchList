import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {colors} from '../constants';
import styled from 'styled-components';

const {height} = Dimensions.get('screen');
const Empty = ({
  text = 'No Data',
  subText,
  home = false,
  imgHeight,
  imgWidth,
}) => {
  return (
    <Container home={home}>
      <Image
        style={{height: 260, width: 200, resizeMode: 'contain'}}
        source={require('../assets/images/empty3.png')}
      />
      <Text
        style={{
          fontSize: 18,
          marginTop: 10,
          fontFamily: 'Poppins-SemiBold',
        }}>
        {text}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Poppins-Light',
        }}>
        Tip: {subText}
      </Text>
    </Container>
  );
};

export default Empty;

const Container = styled.View`
  background-color: ${colors.bgColor} /* Theme Change Here */;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.home ? height - 350 : height)}px;
`;
