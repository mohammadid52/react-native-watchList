import React from 'react';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Card} from '../design';

const RenderList = ({data = [], listTitle, slice = 3, day = 'Today'}) => {
  const renderHeader = `Total ${data.length} Movie${
    data.length > 1 ? 's' : ''
  } To Watch ${day}`;
  return (
    data.length > 0 && (
      <View style={styles.container}>
        {data.length > 0 && (
          <Text style={styles.header}>{listTitle || renderHeader}</Text>
        )}

        <SafeAreaView style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={slice && data.length > slice ? data.slice(0, slice) : data}
            keyExtractor={(item) => item.movieId}
            renderItem={({item}) => <Card list={item} />}
            decelerationRate="fast"
          />
        </SafeAreaView>
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
