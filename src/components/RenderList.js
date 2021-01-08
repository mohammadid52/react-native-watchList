import {capitalize} from 'lodash';
import React from 'react';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {colors} from '../constants';
import {useTabBar} from '../context/TabBarProvider';
import {Card} from '../design';

const RenderList = ({data = [], listTitle, slice, route}) => {
  const renderHeader =
    route !== 'Watched'
      ? `Total ${data.length} Movie${
          data.length > 1 ? 's' : ''
        } To Watch ${capitalize(route)}`
      : `Movies You've Watched`;
  return (
    data.length > 0 && (
      <View style={styles.container}>
        {data.length > 0 && (
          <Text style={styles.header}>{listTitle || renderHeader}</Text>
        )}
        <FlatList
          data={
            !slice ? data : data.length > slice ? data.slice(0, slice) : data
          }
          extraData={route}
          keyExtractor={(item) => item.movieId}
          renderItem={({item}) => <Card list={item} />}
        />
      </View>
    )
  );
};

export default RenderList;
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    marginBottom: 8,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
});
