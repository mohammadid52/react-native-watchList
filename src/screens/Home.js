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
      {/* <ScreenTitle screenTitle="My Watch List" /> */}
      <HeaderHome navigation={navigation} />
      {movies.length > 0 ? (
        <RenderList data={movies} day="All Movies" />
      ) : (
        <Empty text="No Movies To Watch" subText="Click On + To Add Movie" />
      )}
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({});

export default Home;
