import React, {useRef} from 'react';
import styled from 'styled-components';
import {View, Animated} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const NextButton = ({text, goTo}) => {
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
      onPress={goTo}
      style={{
        padding: 8,
        paddingHorizontal: 40,
        transform: [{translateY: animationValue}],
      }}>
      <View>
        <StyledText>{text}</StyledText>
      </View>
      <View style={{marginTop: -4}}>
        <EvilIcons name="chevron-right" size={30} color="#f5f6f9" />
      </View>
    </Button>
  );
};

export default NextButton;

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? 'rgba(222,56,91, .5)' : '#DE385B'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6;
  margin-top: 30;
`;

const StyledText = styled.Text`
  font-size: 20;
  color: #f5f6f9;
  font-family: 'Poppins-Regular';
`;
