import PropTypes from 'prop-types';
import React from 'react';

// icons
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components';

import { useTabBar } from '../context/TabBarProvider';
import { colors } from '../constants';

const Tab = ({ onPress, tab }) => {
  const { selected } = useTabBar();

  const getIconSizeColor = (name) => {
    const renderColor = (currentTab) => (currentTab === selected ? colors.sharpRed : colors.white1);
    const renderSize = (currentTab) => (currentTab === selected ? 21 : 17);

    switch (name) {
      case 'Home':
        return (
          <Feather
            name="home"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      case 'Settings':
        return (
          <Feather
            name="settings"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      case 'Add':
        return (
          <FontAwesome5
            name="plus"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
      default:
        return (
          <Feather
            name="home"
            size={renderSize(name)}
            color={renderColor(name)}
          />
        );
    }
  };

  return (
    <Container onPress={onPress} activeOpacity={0.3}>
      {getIconSizeColor(tab.name)}
      {tab.name === selected && (
        <Decorator
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#fc7e2f', '#f40552']}
        />
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

const Decorator = styled(LinearGradient)`
  position: absolute;
  bottom: -7px;
  background-color: ${colors.sharpRed} /* Theme Change Here */;
  width: 7px;
  border-radius: 10px;
  height: 3px;
`;
