import React from 'react';
import {Text, View, StatusBar, ActivityIndicator} from 'react-native';

import {AnimatedScrollView, ScreenTitle, RenderList} from '../components';
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
  console.log(thisWeekMovies);

  return (
    <AnimatedScrollView>
      <ScreenTitle screenTitle="My Watch List" />
      <RenderList data={todayMovies} slice={3} day="Today" />
      <RenderList data={tomorrowMovies} slice={3} day="Tomorrow" />
      <RenderList data={thisWeekMovies} slice={3} day="This Week" />
    </AnimatedScrollView>
  );
};

export default Home;
