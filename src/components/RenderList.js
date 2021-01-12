import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import { Card } from '../design';

const RenderList = ({ data = [] }) => data.length > 0 && (
<Container>
  <FlatList
    data={data}
    extraData={data}
    keyExtractor={(item) => item.movieId}
    renderItem={({ item }) => <Card list={item} />}
  />
</Container>
);

RenderList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RenderList;

const Container = styled.View`
  margin: 10px;
`;
