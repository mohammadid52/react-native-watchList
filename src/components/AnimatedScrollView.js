import React from 'react';
import {ScrollView} from 'react-native';
import {useTabBar} from '../context/TabBarProvider';

let offsetY = 0;
const AnimatedScrollView = ({children, ...rest}) => {
  const {setShowTabBar} = useTabBar();
  return (
    <ScrollView
      style={{backgroundColor: '#f2f4fb'}}
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
