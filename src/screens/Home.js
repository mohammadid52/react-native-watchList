import React from 'react';
import {Text, View, StatusBar, ActivityIndicator} from 'react-native';

import {
  AnimatedScrollView,
  ScreenTitle,
  RenderList,
  Empty,
} from '../components';
import {colors} from '../constants';
import useMovies from '../hooks/useMovies';

const Home = () => {
  const {loading, movies} = useMovies('all');
  const {movies: todayMovies} = useMovies('today');
  const {movies: tomorrowMovies} = useMovies('tomorrow');
  const {movies: thisWeekMovies} = useMovies('this-week');

  if (loading) {
    return <ActivityIndicator size="small" color={colors.green} />;
  }

  return (
    <AnimatedScrollView>
      <ScreenTitle screenTitle="My Watch List" />
      {movies.length > 0 ? (
        <RenderList data={movies} day="All Movies" />
      ) : (
        <Empty text="No Movies To Watch" subText="Click On + To Add Movie" />
      )}
    </AnimatedScrollView>
  );
};

export default Home;
