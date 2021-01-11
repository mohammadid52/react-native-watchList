import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { orderBy } from 'lodash';

import {
  AnimatedScrollView,
  RenderList,
  Empty,
  HeaderHome,
} from '../../components';
import { colors } from '../../constants';

import useMovies from '../../hooks/useMovies';

const Home = ({ navigation }) => {
  const { loading, movies } = useMovies('all');

  if (loading) {
    return <ActivityIndicator size="small" color={colors.green} />;
  }

  return (
    <AnimatedScrollView>
      <StatusBar hidden />
      <HeaderHome navigation={navigation} />
      {movies.length > 0 ? (
        <RenderList
          listTitle="All Movies And Web Series"
          data={orderBy(movies, 'createdAt', 'desc')}
        />
      ) : (
        <Empty
          home
          text="No Movies To Watch"
          subText="Click On + To Add Movie"
        />
      )}
    </AnimatedScrollView>
  );
};

Home.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Home;
