import { has } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

import { colors } from '../constants';
import { useAuth } from '../context/UserContext';
import { watchAction } from '../helpers';
import { MovieModal, AddNextModal, AutoAddNextModal } from '../modal';

const Card = ({ list }) => {
  // modals
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [addNextModal, setAddNextModal] = useState(false);
  const [autoAddNextModal, setAutoAddNextModal] = useState(false);

  const isWebSeries = has(list, 'webSeries');

  const handleWatchAction = isWebSeries && !list.isWatched
    ? () => setAddNextModal(true)
    : () => watchAction(list.movieId, list.isWatched);
  const { user } = useAuth();

  return (
    <>
      <MovieModal
        isModalVisible={movieModalVisible}
        setModalIsVisible={setMovieModalVisible}
        data={list}
      />
      <AddNextModal
        title={list.title}
        visible={addNextModal}
        watchAction={() => watchAction(list.movieId, list.isWatched)}
        hideModal={() => setAddNextModal(false)}
        data={isWebSeries ? list.webSeries : {}}
        uid={user.uid}
      />
      {isWebSeries && (
        <AutoAddNextModal
          hideModal={() => setAutoAddNextModal(false)}
          isModalVisible={autoAddNextModal}
          data={list}
          uid={user.uid}
        />
      )}
      <StyledCard
        onLongPress={() => setAutoAddNextModal(!autoAddNextModal)}
        activeOpacity={1}
        onPress={() => setMovieModalVisible(true)}
      >
        <CardContainer>
          <View>
            <StyledText>{list.title}</StyledText>
            <TimeText>
              {list.toWatchAt}
              {' '}
              {list.watchTime}
            </TimeText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!isWebSeries ? (
              <WebSeriesCard movie>
                <WebSeriesText movie>Movie</WebSeriesText>
              </WebSeriesCard>
            ) : (
              <WebSeriesCardContainer>
                <WebSeriesCard>
                  <WebSeriesText>
                    Season:
                    {' '}
                    {list.webSeries.seasonNum}
                  </WebSeriesText>
                </WebSeriesCard>
                <WebSeriesCard episode>
                  <WebSeriesText episode>
                    Episode:
                    {' '}
                    {list.webSeries.episodeNum}
                  </WebSeriesText>
                </WebSeriesCard>
              </WebSeriesCardContainer>
            )}

            <TouchableHighlight style={{ marginLeft: 12 }}>
              <Checkbox
                size={20}
                isWatched={list.isWatched}
                // color={list.isWatched ? colors.red : colors.gray}
                onPress={() => handleWatchAction()}
                name={list.isWatched ? 'checksquare' : 'checksquareo'}
              />
            </TouchableHighlight>
          </View>
        </CardContainer>
      </StyledCard>
    </>
  );
};

export default Card;

const Checkbox = styled(AntDesign).attrs((props) => ({
  color: props.isWatched
    ? props.theme.PRIMARY_BLUE
    : props.theme.SECONDARY_BLUE,
}))``;

const StyledCard = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.PRIMARY_BG,
}))`
  height: 70px;
  background-color: ${(props) => props.theme.PRIMARY_BG_CARD};
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border-left-width: 4px;
  border-left-color: ${colors.sharpRed};
`;

const CardContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: 'Poppins-Regular';
`;

const TimeText = styled(StyledText)`
  font-size: 12px;
  color: ${colors.gray};
`;

const WebSeriesText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${(props) => (props.movie
    ? props.theme.PRIMARY_GREEN
    : props.episode
      ? props.theme.PRIMARY_RED
      : props.theme.PRIMARY_BLUE)};
`;

const WebSeriesCard = styled.View`
  padding: 1px 6px;
  border-radius: 6px;
  background-color: ${(props) => (props.movie
    ? props.theme.SECONDARY_GREEN
    : props.episode
      ? props.theme.SECONDARY_RED
      : props.theme.SECONDARY_BLUE)};
  margin-right: 10px;
`;

const WebSeriesCardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
