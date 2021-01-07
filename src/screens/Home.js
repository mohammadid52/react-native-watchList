import {orderBy} from 'lodash';
import React from 'react';
import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  AnimatedScrollView,
  ScreenTitle,
  RenderList,
  Empty,
  HeaderHome,
} from '../components';
import {colors} from '../constants';

import useMovies from '../hooks/useMovies';

const Home = ({navigation}) => {
  const {loading, movies} = useMovies('all');

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
        <Empty text="No Movies To Watch" subText="Click On + To Add Movie" />
      )}
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({});

export default Home;
