import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {BackButton, Empty, RenderList, ScreenTitle} from '../components';
import useMovies from '../hooks/useMovies';

const Content = ({route, navigation}) => {
  let dataKey = 'all';
  const getDataKey = (name) => {
    switch (name) {
      case 'All':
        return (dataKey = 'all');
      case 'Today':
        return (dataKey = 'today');
      case 'Tomorrow':
        return (dataKey = 'tomorrow');
      case 'This-Week':
        return (dataKey = 'this-week');
      case 'Watched':
        return (dataKey = 'watched');

      default:
        return (dataKey = 'all');
    }
  };

  const {loading, movies} = useMovies(getDataKey(route.name));

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {movies.length > 0 ? (
        <>
          <ScreenTitle height={70} screenTitle={route.name} />
          <RenderList route={route.name} data={movies} />
        </>
      ) : (
        <>
          <BackButton goBack={() => navigation.navigate('Home')} />
          <Empty
            home={route.name === 'Tomorrow'}
            text={
              route.name === 'Watched'
                ? 'You Have Not Watched Any Movies yet'
                : `No Movies To Watch ${route.name}`
            }
            subText={
              route.name === 'Watched'
                ? 'Click On Checkbox In Movie Modal'
                : 'Click On + To Add Movies'
            }
          />
        </>
      )}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
