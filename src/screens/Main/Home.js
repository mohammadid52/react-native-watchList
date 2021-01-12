import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar, ActivityIndicator, Dimensions} from 'react-native';
import {orderBy} from 'lodash';
import styled from 'styled-components';

import {
  AnimatedScrollView,
  RenderList,
  Empty,
  HeaderHome,
} from '../../components';
import {colors} from '../../constants';

import useMovies from '../../hooks/useMovies';
import {useTabBar} from '../../context/TabBarProvider';

const {height} = Dimensions.get('screen');
const Home = ({navigation}) => {
  const {loading, movies} = useMovies('all');

  const {setShowTabBar} = useTabBar();

  if (loading) setShowTabBar(false);

  return (
    <AnimatedScrollView>
      <StatusBar hidden />
      {!loading && <HeaderHome navigation={navigation} />}

      {loading ? (
        <LoadingContainer>
          <Loader size={40} />
        </LoadingContainer>
      ) : movies.length > 0 ? (
        <RenderList
          listTitle="All Movies And Web Series"
          data={orderBy(movies, 'createdAt', 'desc')}
        />
      ) : (
        <Empty
          home
          text="No Movies To Watch"
          subText="Click On + To Add Movie/Web Series"
        />
      )}
    </AnimatedScrollView>
  );
};

Home.propTypes = {
  navigation: PropTypes.any.isRequired,
};

const LoadingContainer = styled.View`
  height: ${height}px;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.mode === 'dark' ? '#f2f4fb' : '#162447',
}))``;

export default Home;
