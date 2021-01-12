import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components';

import { Empty, RenderList } from '../../components';
import useMovies from '../../hooks/useMovies';

const { height } = Dimensions.get('screen');

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
    <Container>
      {movies.length > 0 ? (
        <RenderList route={route.name} data={movies} />
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
    </Container>
  );
};

Content.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Container = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BG};
  height: ${height}px;
  padding: 10px;
  padding-top: 60px;
`;

export default Content;
