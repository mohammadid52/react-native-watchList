import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Empty, RenderList, ScreenTitle } from '../../components';
import useMovies from '../../hooks/useMovies';

const Content = ({ route }) => {
  const getDataKey = (name) => {
    switch (name) {
      case 'All':
        return 'all';
      case 'Today':
        return 'today';
      case 'Tomorrow':
        return 'tomorrow';
      case 'This-Week':
        return 'this-week';
      case 'Watched':
        return 'watched';

      default:
        return 'all';
    }
  };

  const { loading, movies } = useMovies(getDataKey(route.name));

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
        <Empty
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
      )}
    </View>
  );
};

Content.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Content;
