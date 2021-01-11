import {capitalize} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';

import {Card} from '../design';

const RenderList = ({data = [], listTitle, slice, route}) => {
  let renderHeader = '';
  if (route !== 'Watched') {
    renderHeader = `Total ${data.length} Movie${
      data.length > 1 ? 's' : ''
    } To Watch ${capitalize(route)}`;
  } else {
    renderHeader = "Movies You've Watched";
  }

  return (
    data.length > 0 && (
      <Container>
        {data.length > 0 && <Header>{listTitle || renderHeader}</Header>}
        <FlatList
          data={
            !slice ? data : data.length > slice ? data.slice(0, slice) : data
          }
          extraData={route}
          keyExtractor={(item) => item.movieId}
          renderItem={({item}) => <Card list={item} />}
        />
      </Container>
    )
  );
};

RenderList.propTypes = {
  data: PropTypes.array.isRequired,
  listTitle: PropTypes.any.isRequired,
  route: PropTypes.string.isRequired,
  slice: PropTypes.any.isRequired,
};

export default RenderList;

const Container = styled.View`
  margin: 10px;
`;

const Header = styled.Text`
  margin-bottom: 8px;
  font-family: 'Poppins-Light';
  text-align: center;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
