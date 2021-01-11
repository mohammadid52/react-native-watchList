import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';

const ScreenTitle = ({
  height, lineHeight, backgroundColor, screenTitle,
}) => (
  <Container
    height={height}
    lineHeight={lineHeight}
    backgroundColor={backgroundColor}
  >
    <HeaderTitle height={height} lineHeight={lineHeight}>
      {screenTitle}
    </HeaderTitle>
  </Container>
);

ScreenTitle.propTypes = {
  backgroundColor: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  lineHeight: PropTypes.any.isRequired,
  screenTitle: PropTypes.any.isRequired,
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
