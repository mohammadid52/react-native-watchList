import PropTypes from 'prop-types';
import React from 'react';

// icons
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components';

import {useTabBar} from '../context/TabBarProvider';
import {colors} from '../constants';

const Tab = ({onPress, tab}) => {
  const {selected} = useTabBar();

  const getIconSizeColor = (name) => {
    const renderSize = (currentTab) => (currentTab === selected ? 21 : 17);

    switch (name) {
      case 'Home':
        return <FeatherIcon name="home" size={renderSize(name)} />;
      case 'Settings':
        return <FeatherIcon name="settings" size={renderSize(name)} />;
      case 'Add':
        return <FontAwesome5Icon name="plus" size={renderSize(name)} />;
      default:
        return <FeatherIcon name="home" size={renderSize(name)} />;
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

const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  position: relative;
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
