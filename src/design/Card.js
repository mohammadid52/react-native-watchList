import {has} from 'lodash';
import React, {useEffect, useState} from 'react';
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

import {colors} from '../constants';
import {watchAction} from '../helpers';
import {MovieModal, AddNextModal, AutoAddNextModal} from '../modal';

const Card = ({list}) => {
  // modals
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [addNextModal, setAddNextModal] = useState(false);
  const [autoAddNextModal, setAutoAddNextModal] = useState(false);

  const isWebSeries = has(list, 'webSeries');

  const handleWatchAction =
    isWebSeries && !list.isWatched
      ? () => setAddNextModal(true)
      : () => watchAction(list.movieId, list.isWatched);

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
      />
      {isWebSeries && (
        <AutoAddNextModal
          hideModal={() => setAutoAddNextModal(false)}
          isModalVisible={autoAddNextModal}
          data={list}
        />
      )}
      <StyledCard
        underlayColor="#fafafa"
        onLongPress={() => setAutoAddNextModal(!autoAddNextModal)}
        activeOpacity={1}
        onPress={() => setMovieModalVisible(true)}>
        <CardContainer>
          <View>
            <StyledText>{list.title}</StyledText>
            <TimeText>
              {list.toWatchAt} {list.watchTime}
            </TimeText>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {!isWebSeries ? (
              <WebSeriesCard movie>
                <WebSeriesText movie>Movie</WebSeriesText>
              </WebSeriesCard>
            ) : (
              <WebSeriesCardContainer>
                <WebSeriesCard>
                  <WebSeriesText>
                    Season: {list.webSeries.seasonNum}
                  </WebSeriesText>
                </WebSeriesCard>
                <WebSeriesCard style={{backgroundColor: colors.lightRed}}>
                  <WebSeriesText style={{color: colors.red}}>
                    Episode: {list.webSeries.episodeNum}
                  </WebSeriesText>
                </WebSeriesCard>
              </WebSeriesCardContainer>
            )}

            <TouchableHighlight style={{marginLeft: 12}}>
              <AntDesign
                size={20}
                color={list.isWatched ? colors.red : colors.gray}
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

const StyledCard = styled.TouchableHighlight`
  height: 70;
  background-color: #fff;
  margin-top: 10;
  margin-bottom: 10;
  border-radius: 6;
  border-left-width: 4;
  border-left-color: ${colors.sharpRed};
`;

const CardContainer = styled.View`
  padding-top: 10;
  padding-right: 10;
  padding-left: 10;
  padding-bottom: 10;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16;
  color: #000;
  font-family: 'Poppins-Regular';
`;

const TimeText = styled(StyledText)`
  font-size: 12;
  color: ${colors.gray};
`;

const WebSeriesText = styled.Text`
  font-family: 'Poppins-Medium';
  color: ${(props) => (props.movie ? colors.green : colors.darkBlue)};
`;

const WebSeriesCard = styled.View`
  padding-left: 6;
  padding-right: 6;
  padding-top: 1;
  padding-bottom: 1;
  border-radius: 6;
  background-color: ${(props) =>
    props.movie ? colors.lightGreen : colors.lightBlue2};
  margin-right: 10;
`;

const WebSeriesCardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
