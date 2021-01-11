import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import { useTabBar } from '../context/TabBarProvider';

let offsetY = 0;
const AnimatedScrollView = ({ children, ...rest }) => {
  const { setShowTabBar } = useTabBar();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => new Promise((res) => {
    setTimeout(res, timeout);
  });
  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <Scroller
      refreshControl={(
        <RefreshControl
          colors={['#ff0000', '#47A9CC', '#16c79a', '#000']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
      {...rest}
      onScroll={({ nativeEvent }) => {
        const newOffSet = nativeEvent.contentOffset.y;
        if (newOffSet <= 0) return setShowTabBar(true);
        newOffSet > offsetY ? setShowTabBar(false) : setShowTabBar(true);
        offsetY = newOffSet;
      }}
    >
      {children}
    </Scroller>
  );
};

AnimatedScrollView.propTypes = {
  children: PropTypes.any.isRequired,
};

const Scroller = styled.ScrollView`
  background-color: ${(props) => props.theme.PRIMARY_BG ?? '#fff'};
`;

export default AnimatedScrollView;
