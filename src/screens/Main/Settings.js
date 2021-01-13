import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { logOut, updateDefaultDate, updateTheme } from '../../helpers';

import { useAuth } from '../../context/UserContext';
import useSettings from '../../hooks/useSettings';

const Settings = () => {
  const [dateIdx, setDateIdx] = useState(0);
  const { user } = useAuth();
  const { settings, defaultSetting } = useSettings(user.uid);

  const { defaultDate, theme, docId } = !settings.length
    ? defaultSetting
    : settings[0];

  const { uid } = user;

  const dateList = [
    'After Hour',
    'Tonight (9PM)',
    'Tomorrow',
    'This Saturday (9PM)',
    'This Sunday (9PM)',
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
    updateDefaultDate(uid, docId, dateList[dateIdx]);
  };

  return (
    <Container>
      <SettingsContainer>
        <View style={{ marginVertical: 15, marginBottom: 30 }}>
          <HeaderText>Hey,</HeaderText>
          <HeaderText>{user.displayName}</HeaderText>
        </View>
        <Item>
          <View>
            <LeftText>Theme</LeftText>
          </View>

          <TouchableOpacity onPress={() => updateTheme(uid, docId, theme)}>
            <RightText>{theme}</RightText>
          </TouchableOpacity>
        </Item>
        <Item>
          <LeftText>Default Date</LeftText>

          <View style={{ zIndex: 1 }}>
            <TouchableOpacity onPress={changeDate}>
              <RightText>{defaultDate}</RightText>
            </TouchableOpacity>
          </View>
        </Item>
        <Item style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => logOut()}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                color: '#f0134d',
              }}
            >
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
  background-color: ${(props) => props.theme.PRIMARY_BG};
`;

const SettingsContainer = styled.View`
  flex: 1;
  padding: 30px;
`;

const Item = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BG_CARD};
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
