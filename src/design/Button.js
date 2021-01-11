import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { View, Animated } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const NextButton = ({ text, onPress, disabled }) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  Animated.sequence([
    Animated.timing(animationValue, {
      toValue: 300,
      useNativeDriver: true,
      duration: 3000,
    }).start(),
    Animated.timing(animationValue, {
      duration: 3000,
      toValue: 0,
      useNativeDriver: true,
    }).start(),
  ]);

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={{
        paddingVertical: 5,
        paddingHorizontal: 40,
        transform: [{ translateY: animationValue }],
      }}
    >
      <View>
        <StyledText>{text}</StyledText>
      </View>
      <View style={{ marginTop: -4 }}>
        <Entypo name="chevron-small-right" size={30} color="#f5f6f9" />
      </View>
    </Button>
  );
};

NextButton.propTypes = {
  onPress: PropTypes.any.isRequired,
  text: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NextButton;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? 'rgba(222,56,91, .5)' : '#DE385B')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 30px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: #f5f6f9;
  font-family: 'Poppins-Regular';
`;
