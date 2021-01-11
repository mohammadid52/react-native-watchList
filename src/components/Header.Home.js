import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

// ICONS
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {colors} from '../constants';
import {useTabBar} from '../context/TabBarProvider';

const {width} = Dimensions.get('screen');

const Header = ({navigation}) => {
  const row1 = [
    {
      iconPro: MaterialIcons,
      iconName: 'local-movies',
      text: 'All',
      iconColor: '#6f4a8e',
      routeName: 'All',
    },
    {
      iconPro: MaterialIcons,
      iconName: 'today',
      iconColor: '#ff8e6e',
      text: 'Today',
      routeName: 'Today',
    },
    {
      iconPro: Feather,
      iconName: 'calendar',
      iconColor: '#db6400',
      text: 'Tomorrow',
      routeName: 'Tomorrow',
    },
  ];
  const row2 = [
    {
      iconPro: MaterialIcons,
      iconColor: '#f05454',
      iconName: 'next-week',
      text: 'This Week',
      routeName: 'This-Week',
    },
    {
      iconColor: '#16a596',

      iconPro: Ionicons,
      iconName: 'time-outline',
      text: 'Watched',
      routeName: 'Watched',
    },
    {
      iconColor: '#ff4b5c',
      iconPro: EvilIcons,
      iconName: 'gear',
      text: 'Settings',
      routeName: 'Settings',
    },
  ];

  const cardArray = [row1, row2];

  const {setSelected} = useTabBar();

  return (
    <HeaderCard start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
      {cardArray.map((mainCard) => (
        <Row>
          {mainCard.map((card) => (
            <Card
              activeOpacity={0.8}
              key={card.iconColor}
              onPress={() => {
                navigation.navigate(card.routeName);
                card.routeName === 'Settings' && setSelected('Settings');
              }}>
              <InnerCard>
                <card.iconPro
                  name={card.iconName}
                  size={card.routeName === 'Settings' ? 35 : 30}
                  color={card.iconColor}
                />
                <StyledText>{card.text}</StyledText>
              </InnerCard>
            </Card>
          ))}
        </Row>
      ))}
    </HeaderCard>
  );
};

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;

const HeaderCard = styled(LinearGradient).attrs((props) => ({
  colors:
    props.theme.mode === 'dark'
      ? props.theme.HEADER_CARD
      : ['#fc7e2f', '#f40552'],
}))`
  flex-direction: column;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  margin: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: ${width}px;
`;

const Card = styled.TouchableOpacity`
  height: 70px;
  width: 70px;
  background-color: ${(props) => props.theme.SECONDARY_BLUE};
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InnerCard = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 10px;
  font-family: 'Poppins-Bold';
  margin-top: 3px;
  color: ${(props) => props.theme.PRIMARY_BLUE};
`;
