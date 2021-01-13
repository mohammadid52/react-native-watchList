import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { orderBy } from 'lodash';
import styled from 'styled-components';

import {
  AnimatedScrollView,
  RenderList,
  Empty,
  HeaderHome,
} from '../../components';

import useMovies from '../../hooks/useMovies';
import { AddNewModal } from '../../modal';

const { height } = Dimensions.get('screen');
const Home = ({ navigation }) => {
  const { loading, movies } = useMovies('all');

  return (
    <AnimatedScrollView>
      <StatusBar hidden />
      {!loading && <HeaderHome navigation={navigation} />}
      {/*  Modal  */}
      <AddNewModal />

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
