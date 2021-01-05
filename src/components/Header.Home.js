import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient
      style={styles.headerCard}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#fc7e2f', '#f40552']}>
      {cardArray.map((mainCard) => (
        <View style={styles.row}>
          {mainCard.map((card) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={card.iconColor}
              style={styles.card}
              onPress={() => {
                navigation.navigate(card.routeName);
                card.routeName === 'Settings' && setSelected('Settings');
              }}>
              <View style={styles.innerCard}>
                <card.iconPro
                  name={card.iconName}
                  size={card.routeName === 'Settings' ? 35 : 30}
                  color={card.iconColor}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 10,
                    color: colors.textColor,
                  }}>
                  {card.text}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.darkRed,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 14,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    margin: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width,
  },
  card: {
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
