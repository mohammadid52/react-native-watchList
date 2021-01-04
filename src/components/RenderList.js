import React from 'react';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useTabBar} from '../context/TabBarProvider';
import {Card} from '../design';

const RenderList = ({data = [], listTitle, slice, day = 'Today'}) => {
  const renderHeader = `Total ${data.length} Movie${
    data.length > 1 ? 's' : ''
  } To Watch ${day}`;
  const {setShowTabBar} = useTabBar();

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
    margin: 7,
  },
  header: {
    marginBottom: 8,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
});
