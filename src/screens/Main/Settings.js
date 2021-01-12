import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import {colors} from '../../constants';
import {logOut, updateDefaultDate, updateTheme} from '../../helpers';
import useTheme from '../../hooks/useTheme';
import {useAuth} from '../../context/UserContext';
import * as storage from '../../storage';
import useSettings from '../../hooks/useSettings';

const Settings = () => {
  const [defaultDate, setDefaultDate] = useState();

  const [dateIdx, setDateIdx] = useState(0);
  const {user} = useAuth();
  // const {theme, mode} = useTheme();
  const {settings} = useSettings(user.uid);

  const defaultSetting = {
    defaultDate: 'Tonight (9PM)',
    theme: 'dark',
  };

  const userSettings = !settings.length ? defaultSetting : settings[0];

  const defaultList = [
    'After Hour',
    'Tonight (9PM)',
    'Tomorrow',
    'This Saturday(9 PM)',
    'This Sunday(9 PM)',
  ];

  const handlePress = () => {
    if (dateIdx >= 0) {
      setDateIdx(dateIdx + 1);
    }
    if (dateIdx === 3) {
      setDateIdx(0);
    }
  };

  const changeDate = () => {
    handlePress();
    updateDefaultDate(user.uid, userSettings.docId, defaultList[dateIdx]);
  };

  return (
    <Container>
      <SettingsContainer>
        <View style={{marginVertical: 15, marginBottom: 30}}>
          <HeaderText>Hey,</HeaderText>
          <HeaderText>{user.displayName}</HeaderText>
        </View>
        <Item>
          <View>
            <LeftText>Theme</LeftText>
          </View>

          <TouchableOpacity
            onPress={() =>
              updateTheme(user.uid, userSettings.docId, userSettings.theme)
            }>
            <RightText>{userSettings.theme}</RightText>
          </TouchableOpacity>
        </Item>
        <Item>
          <LeftText>Default Date</LeftText>

          <View style={{zIndex: 1}}>
            <TouchableOpacity onPress={changeDate}>
              <RightText>{userSettings.defaultDate}</RightText>
            </TouchableOpacity>
          </View>
        </Item>
        <Item style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => logOut()}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
                color: colors.red,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </Item>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BG} /* Change Theme Here */;
`;

const SettingsContainer = styled.View`
  flex: 1;
  padding: 30px;
`;

const Item = styled.View`
  background-color: ${(props) =>
    props.theme.PRIMARY_BG_CARD}; /* Change Theme Here */
  margin-bottom: 30px;
  height: 60px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
`;

const HeaderText = styled.Text`
  font-size: 30;
  font-family: 'Poppins-Medium';
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const LeftText = styled(HeaderText)`
  font-size: 18px;
`;
const RightText = styled(LeftText)`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
