import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions } from 'react-native';
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

  const noData = !movies.length;
  return (
    <Container>
      {loading ? (
        <Loader>
          <Loading color="white" size={40} />
        </Loader>
      ) : !noData ? (
        <RenderList route={route.name} data={movies} />
      ) : (
        <Empty
          text={
            route.name === 'Watched'
              ? 'You Have Not Watched Any Movies yet'
              : 'No Movies To Watch'
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

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.mode === 'dark' ? '#f2f4fb' : '#162447',
}))``;

export default Content;
