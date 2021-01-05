import React, {useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import colors from '../constants/colors';
import {useTabBar} from '../context/TabBarProvider';

let offsetY = 0;
const AnimatedScrollView = ({children, ...rest}) => {
  const {setShowTabBar} = useTabBar();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((res) => {
      setTimeout(res, timeout);
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={['#ff0000', '#47A9CC', '#16c79a', '#000']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={{backgroundColor: colors.bgColor}}
      {...rest}
      onScroll={({nativeEvent}) => {
        const newOffSet = nativeEvent.contentOffset.y;
        if (newOffSet <= 0) return setShowTabBar(true);
        newOffSet > offsetY ? setShowTabBar(false) : setShowTabBar(true);
        offsetY = newOffSet;
      }}>
      {children}
    </ScrollView>
  );
};

export default AnimatedScrollView;
