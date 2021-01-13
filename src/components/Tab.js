import PropTypes from 'prop-types';
import React from 'react';

// icons
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components';

import {useTabBar} from '../context/TabBarProvider';
import {colors} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Tab = ({onPress, tab}) => {
  const {selected} = useTabBar();

  const getIconSizeColor = (name) => {
    switch (name) {
      case 'Home':
        return <FeatherIcon name="home" size={18} />;
      case 'Settings':
        return <FeatherIcon name="settings" size={18} />;
      case 'Add':
        return <FontAwesome5Icon name="plus" size={18} />;
      default:
        return <FeatherIcon name="home" size={18} />;
    }
  };

  return (
    <Container onPress={onPress} activeOpacity={0.3}>
      {getIconSizeColor(tab.name)}
      {tab.name === selected && (
        <Decorator start={{x: 0, y: 0}} end={{x: 1, y: 1}} />
      )}
    </Container>
  );
};

Tab.propTypes = {
  onPress: PropTypes.any.isRequired,
  tab: PropTypes.shape({
    name: PropTypes.any.isRequired,
  }).isRequired,
};

export default Tab;

const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  position: relative;
`;

const FeatherIcon = styled(Feather).attrs((props) => ({
  color: props.theme.mode === 'dark' ? props.theme.SECONDARY_BLUE : '#fc7e2f',
}))``;
const FontAwesome5Icon = styled(FontAwesome5).attrs((props) => ({
  color: props.theme.mode === 'dark' ? props.theme.PRIMARY_BLUE : '#ff0000',
}))`
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? props.theme.SECONDARY_BLUE : '#fff'};
  padding: 9px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 100px;
`;

const Decorator = styled(LinearGradient).attrs((props) => ({
  colors:
    props.theme.mode === 'dark'
      ? ['#bedcfa', '#bedcfa']
      : ['#fc7e2f', '#f40552'],
}))`
  position: absolute;
  bottom: -7px;
  background-color: ${(props) => props.theme.PRIMARY_BLUE};
  width: 7px;
  border-radius: 10px;
  height: 3px;
`;
